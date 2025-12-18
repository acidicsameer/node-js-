import express from "express"; //es
// const express=require('expxress')//cjs = common js
const app = express();

app.get("/", function (req,res) {
  res.send("hello");
});


app.listen(3000, () => {
  console.log("server has successfully started");
});
