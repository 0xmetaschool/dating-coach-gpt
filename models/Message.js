import mongoose from 'mongoose';

// @dev Define the schema for the Message model.
const MessageSchema = new mongoose.Schema({
  // @dev Reference to the user ID associated with the message.
  userId: mongoose.Schema.Types.ObjectId,
  
  // @dev Role of the message, either 'user' or 'assistant'.
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  
  // @dev Content of the message.
  content: String,
  
  // @dev Timestamp for when the message was created, defaults to the current date and time.
  timestamp: { type: Date, default: Date.now }
});

// @dev Export the Message model, ensuring it is only created if it doesn't already exist.
export default mongoose.models.Message || mongoose.model('Message', MessageSchema);