/* eslint-disable no-undef */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConn = async () => {
  try {
    const url = process.env.MONGO_URL;
    await mongoose.connect(url);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("error occured ", error);
  }
};
export default dbConn;
