import connectDB from '../../utils/connectDB';
import Message from '../../models/Message';
import { authenticate } from '../../utils/auth';

// @dev Export the default handler wrapped with authentication middleware.
export default authenticate(async function handler(req, res) {
  // @dev Ensure the request method is GET.
  if (req.method === 'GET') {
    // @dev Connect to the database.
    await connectDB();
    try {
      // @dev Fetch the last 50 messages for the user, sorted by timestamp in descending order.
      const messages = await Message.find({ userId: req.userId })
        .sort({ timestamp: -1 })
        .limit(50);

      // @dev Map the fetched messages to a history format.
      const history = messages.map(message => ({
        role: message.role,
        content: message.content
      }));

      // @dev Send the conversation history as a JSON response.
      res.json(history);
    } catch (error) {
      // @dev Log and handle any errors that occur during the retrieval of conversation history.
      console.error('Error retrieving conversation history:', error);
      res.status(500).json({ message: "Error retrieving conversation history", error: error.message });
    }
  } else {
    // @dev Handle unsupported HTTP methods by setting the 'Allow' header and returning a 405 status.
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});