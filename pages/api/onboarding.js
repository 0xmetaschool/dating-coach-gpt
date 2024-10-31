import connectDB from '../../utils/connectDB';
import User from '../../models/User';
import { authenticate } from '../../utils/auth';

// @dev Export the default handler wrapped with authentication middleware.
export default authenticate(async function handler(req, res) {
  // @dev Ensure the request method is POST.
  if (req.method === 'POST') {
    // @dev Connect to the database.
    await connectDB();
    try {
      // @dev Extract the age, gender, and interests from the request body.
      const { age, gender, interests } = req.body;

      // @dev Update the user's details and mark onboarding as complete.
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { age, gender, interests, onboardingComplete: true },
        { new: true, runValidators: true }
      );

      // @dev If the user is not found, return a 404 Not Found status with an error message.
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // @dev Send a success message along with the updated user details in the response.
      res.json({ message: "Onboarding completed successfully", user: updatedUser });
    } catch (error) {
      // @dev Handle any errors that occur during the onboarding process.
      res.status(500).json({ message: "Error completing onboarding", error: error.message });
    }
  } else {
    // @dev Handle unsupported HTTP methods by setting the 'Allow' header and returning a 405 status.
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});