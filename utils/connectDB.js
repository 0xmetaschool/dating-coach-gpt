import mongoose from 'mongoose';

// @dev Function to connect to the MongoDB database.
const connectDB = async () => {
  // @dev Check if there is already an active connection to the database.
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    // @dev Connect to the MongoDB database using the URI from environment variables.
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // @dev Use the new URL parser.
      useUnifiedTopology: true, // @dev Use the new Server Discover and Monitoring engine.
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    // @dev Log the error and exit the process if the connection fails.
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;