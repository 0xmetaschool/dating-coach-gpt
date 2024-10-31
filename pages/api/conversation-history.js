import connectDB from '../../utils/connectDB';
import Message from '../../models/Message';
import { authenticate } from '../../utils/auth';

export default authenticate(async function handler(req, res) {
  if (req.method === 'GET') {
    await connectDB();
    try {
      const messages = await Message.find({ userId: req.userId })
        .sort({ timestamp: -1 })
        .limit(50);

      const history = messages.map(message => ({
        role: message.role,
        content: message.content
      }));

      res.json(history);
    } catch (error) {
      console.error('Error retrieving conversation history:', error);
      res.status(500).json({ message: "Error retrieving conversation history", error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});