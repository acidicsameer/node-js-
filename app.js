import express from "express";
const app = express();
import bcrypt from "bcrypt";

import User from "./model/user.model.js";
import Blog from "./model/blog.model.js";
import dbConn from "./database/db.js";
app.use(express.json());


app.post("/register", async function (req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });
  res.json({
    message: "user register successfully",
  });
});

app.delete("/delete/:id", async function (req, res) {
  const id = req.params.id;
  await User.findByIdAndDelete(id);

  res.status(200).json({
    message: "user with that id deleted succesfully",
    data: null,
  });
}); 
app.post("/blog", async(req,res)=>{
const{title,subtitle,description}=req.body; 
 const data=await Blog.create({
  title,
  subtitle,
  description
}) 
res.status(200).json({
  message:"successfully added a blog " ,
  data
})
}) 
app.get("/blog",async(req,res)=>{
  const data= await Blog.find()
  res.json({
    message:"successfully fetched blogs ",
    data
  })
})
app.delete("/blog/:id",async(req,res)=>{ 
try {
    const id =req.params.id 
 await Blog.findByIdAndDelete(id) 
  return res.json({
  message:"successfully deleted blog",
  
 })
} catch (error) {
   return res.json({
    message:"error while deleting",
    error:error.message
  })
  
}
}) 



















dbConn()
app.listen(3000, function () {

  console.log("server has started at port 3000");
});
