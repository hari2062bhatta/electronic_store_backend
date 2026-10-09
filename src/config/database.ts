import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DATABASE}`,
    );
    console.log("database connected successfully");
  } catch (err) {
    console.log("some error ", err);
  }
};

export default connection;
