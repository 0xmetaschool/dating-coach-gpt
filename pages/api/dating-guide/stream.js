import { authenticateSSE } from '../../../utils/auth';
import { OpenAI } from 'openai';
import User from '../../../models/User';
import Message from '../../../models/Message';

// @dev Initialize the OpenAI client with the API key from environment variables.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @dev Export the default handler wrapped with SSE authentication middleware.
export default authenticateSSE(async function handler(req, res) {
  // @dev Ensure the request method is GET.
  if (req.method === 'GET') {
    // @dev Extract the 'input' query parameter from the request.
    const { input } = req.query;
    
    // @dev Set the response headers for SSE (Server-Sent Events).
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    });

    // @dev Fetch the user by ID from the database.
    const user = await User.findById(req.userId);
    if (!user) {
      // @dev If user is not found, send an error message and end the response.
      res.write(`data: ${JSON.stringify({ error: "User not found" })}\n\n`);
      res.end();
      return;
    }

    // @dev Fetch the last 6 messages for the user, sorted by timestamp in descending order.
    const lastMessages = await Message.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(6);

    // @dev Reverse the order of the messages and map them to a conversation history format.
    const conversationHistory = lastMessages.reverse().map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // @dev Construct a user context string with relevant user information.
    const userContext = `User Info:
    Name: ${user.name.split(' ')[0] || user.name}
    Age: ${user.age}
    Gender: ${user.gender}
    Interests: ${user.interests.join(', ')}`;

    // @dev Save the user's input as a new message in the database.
    await new Message({ userId: req.userId, role: 'user', content: input }).save();

    // @dev Prepare the messages array for the OpenAI API call, including system, user context, conversation history, and current input.
    const messages = [
      { role: "system", content: "You are a gentle and insightful Love Guru, an expert in love, relationships, and human connection. Your role is to guide the user in discovering their feelings and desires in relationships by asking thoughtful, open-ended questions. Start by asking one reflective question at a time and provide concise, supportive answers to user's question within 2-3 questions. Maintain a conversational and balanced pace, allowing the user to explore their emotions and hopes for love deeply but efficiently." },
      { role: "user", content: userContext },
      ...conversationHistory,
      { role: "user", content: input }
    ];

    try {
      // @dev Create a chat completion stream using the OpenAI API.
      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        stream: true,
      });

      let assistantResponse = '';

      // @dev Process each chunk of the stream and write it to the response.
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        assistantResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }

      // @dev Save the assistant's response as a new message in the database.
      await new Message({ userId: req.userId, role: 'assistant', content: assistantResponse }).save();

      // @dev Signal the end of the stream with a "[DONE]" message.
      res.write(`data: ${JSON.stringify({ content: "[DONE]" })}\n\n`);
      res.end();
    } catch (error) {
      // @dev Log and handle any errors that occur during the stream.
      console.error('Error in SSE stream:', error);
      res.write(`data: ${JSON.stringify({ error: "Error generating advice" })}\n\n`);
      res.end();
    }
  } else {
    // @dev Handle unsupported HTTP methods by setting the 'Allow' header and returning a 405 status.
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});