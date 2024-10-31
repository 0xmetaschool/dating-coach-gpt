import { authenticateSSE } from '../../../utils/auth';
import { OpenAI } from 'openai';
import User from '../../../models/User';
import Message from '../../../models/Message';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default authenticateSSE(async function handler(req, res) {
  if (req.method === 'GET') {
    const { input } = req.query;
    
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    });

    const user = await User.findById(req.userId);
    if (!user) {
      res.write(`data: ${JSON.stringify({ error: "User not found" })}\n\n`);
      res.end();
      return;
    }

    const lastMessages = await Message.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(6);

    const conversationHistory = lastMessages.reverse().map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const userContext = `User Info:
    Name: ${user.name.split(' ')[0] || user.name}
    Age: ${user.age}
    Gender: ${user.gender}
    Interests: ${user.interests.join(', ')}`;

    await new Message({ userId: req.userId, role: 'user', content: input }).save();

    const messages = [
      { role: "system", content: "You are a gentle and insightful Love Guru, an expert in love, relationships, and human connection. Your role is to guide the user in discovering their feelings and desires in relationships by asking thoughtful, open-ended questions. Start by asking one reflective question at a time and provide concise, supportive answers to user's question within 2-3 questions. Maintain a conversational and balanced pace, allowing the user to explore their emotions and hopes for love deeply but efficiently." },
      { role: "user", content: userContext },
      ...conversationHistory,
      { role: "user", content: input }
    ];

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        stream: true,
      });

      let assistantResponse = '';

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        assistantResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }

      await new Message({ userId: req.userId, role: 'assistant', content: assistantResponse }).save();

      res.write(`data: ${JSON.stringify({ content: "[DONE]" })}\n\n`);
      res.end();
    } catch (error) {
      console.error('Error in SSE stream:', error);
      res.write(`data: ${JSON.stringify({ error: "Error generating advice" })}\n\n`);
      res.end();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});