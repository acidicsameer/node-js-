import mongoose from "mongoose";
import { Schema } from "mongoose";
const UserModel = mongoose.Schema({
  UserName: {
    type: String,
    required: [true, "Username must be provided "],
  },
  UserEmail: {
    type: String,
    unique: true,
  },
  UserPassword: {
    type: String,
  },
}); 
const User=mongoose.model("User",UserModel)
export default User
