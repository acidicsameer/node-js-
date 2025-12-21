import express from "express";
const app = express();
import bcrypt from "bcrypt";

import User from "./model/user.model.js";
import Blog from "./model/blog.model.js";
import dbConn from "./database/db.js";
app.use(express.json());
//register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const pass = await bcrypt.hash(password, 10);
  const data = await User.create({
    name,
    email,
    password: pass,
  });
  if (!data) {
    return res.json({
      message: "no data found ",
    });
  }
  res.json({
    message: "user register successfully",
    data,
  });
});
//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.json({
      message: "user is not login .register first ",
    });
  }
  const dbpass = userExists.password; 
  const passwordmatched = bcrypt.compareSync(password, dbpass);
  if (!passwordmatched) {
    return res.json({
      message: "user password or email is not matched ",
    });
  }
  res.json({
    message: "user login successfully ",
  });
});
app.delete("/user/:id", async function (req, res) {
  const id = req.params.id;
  await User.findByIdAndDelete(id);

  res.status(200).json({
    message: "user with that id deleted succesfully",
    data: null,
  });
});
app.get("/user", async (req, res) => {
  const data = await User.find();
  if (!data) {
    return res.json({
      message: "no users available ",
    });
  }
});
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const data = await User.findById(id).select("-password", "-__v");
  if (!data) {
    return res.status(404).json({
      message: "cant get respective user",
    });
  }
  res.status(200).json({
    message: "successfully fetched   respective user",
    data,
  });
});

app.patch("/user/:id", async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.params.id;
  const data = await User.findByIdAndUpdate(id, {
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });
  res.json({
    message: "successfully updated user ",
    data,
  });
});

//blog
app.post("/blog", async (req, res) => {
  const { title, subtitle, description } = req.body;
  const data = await Blog.create({
    title,
    subtitle,
    description,
  });
  res.status(200).json({
    message: "successfully added a blog ",
    data,
  });
});
app.get("/blog", async (req, res) => {
  const data = await Blog.find();
  res.json({
    message: "successfully fetched blogs ",
    data,
  });
});
app.delete("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    return res.json({
      message: "successfully deleted blog",
    });
  } catch (error) {
    return res.json({
      message: "error while deleting",
      error: error.message,
    });
  }
});
app.patch("/blog/:id", async (req, res) => {
  const { title, subtitle, description } = req.body;
  const id = req.params.id;
  const data = await Blog.findByIdAndUpdate(id, {
    title,
    subtitle,
    description,
  });
  res.json({
    message: "successfully updated blog ",
    data,
  });
});
app.get("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Blog.findById(id);
  if (!data) {
    return res.status(404).json({
      message: "cant get respective blog",
    });
  }
  res.status(200).json({
    message: "successfully fetched   respective blog",
    data,
  });
});

dbConn();
app.listen(3000, function () {
  console.log("server has started at port 3000");
});
