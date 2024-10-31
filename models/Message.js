import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);