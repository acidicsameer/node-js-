import mongoose from "mongoose";
import { Schema } from "mongoose";
const UserModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username must be provided "],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
}); 
const User = mongoose.model("User", UserModel);
export default User;