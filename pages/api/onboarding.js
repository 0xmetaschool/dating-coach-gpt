import connectDB from '../../utils/connectDB';
import User from '../../models/User';
import { authenticate } from '../../utils/auth';

export default authenticate(async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();
    try {
      const { age, gender, interests } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { age, gender, interests, onboardingComplete: true },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "Onboarding completed successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error completing onboarding", error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});