import mongoose from "mongoose";
import { env } from "../config/env.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(env.MONGODB_URI);
    console.log(
      `MONGODB Connected!! DB HOST:  ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;
