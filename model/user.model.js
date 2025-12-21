import mongoose from "mongoose";
import { Schema } from "mongoose";
const UserModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username must be provided "],
  },
  email: {
    type: String, 
  
  
  },
  password: {
    type: String,
  },
}); 
const User=mongoose.model("User",UserModel)
export default User
