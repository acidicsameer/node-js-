import express from "express"; //es
import dbConn from "./database/db.js";
import User from "./model/user.model.js";
// const express=require('expxress')//cjs = common js
const app = express();

app.get("/getdata",  async function (req,res) {

const data=await User.find() 
res.json({
  data
})
});
dbConn()

app.listen(3000, () => {
  console.log("server has successfully started");
});
