import connectDB from '../../utils/connectDB';
import User from '../../models/User';
import { authenticate } from '../../utils/auth';

// @dev Export the default handler wrapped with authentication middleware.
export default authenticate(async function handler(req, res) {
  // @dev Connect to the database.
  await connectDB();

  // @dev Handle GET requests to fetch user details.
  if (req.method === 'GET') {
    try {
      // @dev Fetch the user by ID, excluding the password field.
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        // @dev If the user is not found, return a 404 Not Found status with an error message.
        return res.status(404).json({ message: "User not found" });
      }
      // @dev Send the user details in the response.
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        onboardingComplete: user.onboardingComplete,
        credits: user.credits,
      });
    } catch (error) {
      // @dev Handle any errors that occur during the user fetch process.
      res.status(500).json({ message: "Error fetching user", error: error.message });
    }
  } 
  // @dev Handle PUT requests to update user details.
  else if (req.method === 'PUT') {
    try {
      // @dev Extract the updates from the request body.
      const updates = req.body;

      // @dev Update the user by ID, excluding the password field.
      const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
      if (!user) {
        // @dev If the user is not found, return a 404 Not Found status with an error message.
        return res.status(404).json({ message: "User not found" });
      }
      // @dev Send the updated user details in the response.
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        onboardingComplete: user.onboardingComplete,
        credits: user.credits,
      });
    } catch (error) {
      // @dev Handle any errors that occur during the user update process.
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  } else {
    // @dev Handle unsupported HTTP methods by setting the 'Allow' header and returning a 405 status.
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});