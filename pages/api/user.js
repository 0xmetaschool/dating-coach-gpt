import connectDB from '../../utils/connectDB';
import User from '../../models/User';
import { authenticate } from '../../utils/auth';

export default authenticate(async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        onboardingComplete: user.onboardingComplete,
        credits: user.credits,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const updates = req.body;
      const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        onboardingComplete: user.onboardingComplete,
        credits: user.credits,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});