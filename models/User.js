import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  gender: String,
  interests: [String],
  onboardingComplete: { type: Boolean, default: false },
  credits: {
    type: Number,
    default: 50, // set default credits to 50
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);