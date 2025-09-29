import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  password:{
    type:String,
  }
},{
    timestamps:true,
});

const usermodel  =mongoose.model("user",userSchema);
export default usermodel;