import connectDB from '../../utils/connectDB';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @dev Export the default handler for the login endpoint.
export default async function handler(req, res) {
  // @dev Ensure the request method is POST.
  if (req.method === 'POST') {
    // @dev Connect to the database.
    await connectDB();
    try {
      // @dev Extract the email and password from the request body.
      const { email, password } = req.body;

      // @dev Find the user by email in the database.
      const user = await User.findOne({ email });

      // @dev Check if the user exists and if the provided password matches the hashed password.
      if (user && await bcrypt.compare(password, user.password)) {
        // @dev Generate a JWT token with the user ID and set it to expire in 1 day.
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // @dev Send the token and user details in the response.
        res.json({ 
          token, 
          user: { 
            id: user._id, 
            name: user.name, 
            email: user.email, 
            onboardingComplete: user.onboardingComplete 
          } 
        });
      } else {
        // @dev If credentials are invalid, return a 401 Unauthorized status with an error message.
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      // @dev Handle any errors that occur during the login process.
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  } else {
    // @dev Handle unsupported HTTP methods by setting the 'Allow' header and returning a 405 status.
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}