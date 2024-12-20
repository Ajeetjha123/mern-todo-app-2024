import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connections = await mongoose.connect(process.env.MONOGO_URI);
    console.log(`MongoDB connected: ${connections.connection.host}`);
  } catch (error) {
    console.log("Error occued while connecting to the database", error);
  }
};
export default connectDB;
