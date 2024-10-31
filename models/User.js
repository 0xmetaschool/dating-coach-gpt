import mongoose from 'mongoose';

// @dev Define the schema for the User model.
const UserSchema = new mongoose.Schema({
  // @dev User's full name.
  name: String,
  
  // @dev User's email address, which must be unique.
  email: { type: String, unique: true },
  
  // @dev User's password (hashed).
  password: String,
  
  // @dev User's age.
  age: Number,
  
  // @dev User's gender.
  gender: String,
  
  // @dev Array of user's interests.
  interests: [String],
  
  // @dev Boolean indicating whether the user has completed the onboarding process, defaults to false.
  onboardingComplete: { type: Boolean, default: false },
  
  // @dev Number of credits the user has, defaults to 50.
  credits: {
    type: Number,
    default: 50, // set default credits to 50
  },
});

// @dev Export the User model, ensuring it is only created if it doesn't already exist.
export default mongoose.models.User || mongoose.model('User', UserSchema);