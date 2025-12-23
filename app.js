import express from "express";
const app = express();
import User from "./model/user.model.js";
import Blog from "./model/blog.model.js";
import dbConn from "./database/db.js";
import {
  deleteUser,
  getSingleUser,
  getUsers,
  login,
  register,
  updateUser,
} from "./controllers/user/user.controller.js";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
} from "./controllers/blog.controller.js";
app.use(express.json());
//register
app.post("/register", register);
//login
app.post("/login", login); 
app.delete("/user/:id", deleteUser);
app.get("/user", getUsers);
app.get("/user/:id", getSingleUser);
app.patch("/user/:id", updateUser);

//blog
app.post("/blog", createBlog);
app.get("/blog", getBlog);
app.delete("/blog/:id", deleteBlog);
app.patch("/blog/:id", updateBlog);
app.get("/blog/:id", getSingleBlog);

dbConn();
app.listen(3000, function () {
  console.log("server has started at port 3000");
});
//hashed lai reversed garna mildaina tara token lai reverse/decode garna milx ..
