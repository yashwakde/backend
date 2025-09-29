import usermodel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
async function registerUser(req, res) {
  const {
    fullname: { firstname, lastname },
    email,
    password,
  } = req.body;
  const isuserExisting = await usermodel.findOne({ email });
  if (isuserExisting) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await usermodel.create({
    fullname: { firstname, lastname },
    email,
    password: hashedPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
res.cookie("token",token,);
res.status(201).json({
    message:"User registered successfully",
    user:{
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
    }});
}

async function loginUser(req,res){
  const {email,password}= req.body;
  const isuserExisting = await usermodel.findOne({
    email
  });
  if(!isuserExisting){
    return res.status(400).json({
      message:"Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(password,isuserExisting.password);
   if(!isPasswordValid){
    return res.status(400).json({
      message:"Invalid email or password"
    })
   }
   const token = jwt.sign({id:isuserExisting._id},process.env.JWT_SECRET);
   res.cookie("token",token);
   res.status(200).json({
    message:"user login successfully",
    user:{
      _id:isuserExisting._id,
      fullname:isuserExisting.fullname,
      email:isuserExisting.email,
    }
   })
}

export {registerUser,loginUser}