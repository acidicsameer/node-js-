/* eslint-disable no-undef */
 
 import bcrypt from "bcrypt"; 
 import User from "../../model/user.model.js";
import jwt  from "jsonwebtoken";
 import dotenv from 'dotenv'
 dotenv.config()
 export const register =async (req, res) => {
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
} 
export const login = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email});
  if (!userExists) {
    return res.json({
      message: "user is not login .register first ",
    });
  }
 
  console.log("Input password:", password);
  console.log("Stored password:", userExists.password);
  
  const passwordmatched = await bcrypt.compare(password, userExists.password);
  console.log("Password matched:", passwordmatched);
  
  if (!passwordmatched) {
    return res.json({
      message: "user password or email is not matched ",
    });
  } 
  
  const token = jwt.sign(
    { userId: userExists._id }, 
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d"
    }
  );
  
  console.log(token);
  
  res.json({
    message: "user login successfully",
   
  }); 
};
export const deleteUser= async function (req, res) {
  const id = req.params.id;
  await User.findByIdAndDel3ete(id);

  res.status(200).json({
    message: "user with that id deleted succesfully",
    data: null,
  });
}
export const getUsers=async (req, res) => {
  const data = await User.find({});
  if (!data) {
    return res.json({
      message: "no users available ",
    });
  } 
  res.json({
    data
  })
} 
export const getSingleUser= async (req, res) => {
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
}
 export const updateUser=async (req, res) => {
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
 }