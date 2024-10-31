import connectDB from '../../utils/connectDB';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @dev Export the default handler for the user registration endpoint.
export default async function handler(req, res) {
  // @dev Ensure the request method is POST.
  if (req.method === 'POST') {
    // @dev Connect to the database.
    await connectDB();
    try {
      // @dev Extract the name, email, and password from the request body.
      const { name, email, password } = req.body;

      // @dev Check if a user with the provided email already exists.
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // @dev If the email already exists, return a 400 Bad Request status with an error message.
        return res.status(400).json({ message: "Email already exists" });
      }

      // @dev Hash the password using bcrypt with a salt round of 10.
      const hashedPassword = await bcrypt.hash(password, 10);

      // @dev Create a new user with the provided details and set initial credits to 50.
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        credits: 50, // set initial credits to 50
      });

      // @dev Generate a JWT token for the new user with an expiration of 1 day.
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      // @dev Send a success message along with the token and user details in the response.
      res.status(201).json({ 
        message: "User created successfully",
        token,
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email, 
          onboardingComplete: user.onboardingComplete,
          credits: user.credits // include credits in the response
        }
      });
    } catch (error) {
      // @dev Handle any errors that occur during the user creation process.
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  } else {
    // @dev Handle unsupported HTTP methods by setting the 'Allow' header and returning a 405 status.
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}