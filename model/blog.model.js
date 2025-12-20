import mongoose from "mongoose";
import { Schema } from "mongoose";
const BlogModel = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title must be provided "],
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
}); 
const Blog=mongoose.model("Blog",BlogModel)
export default Blog
