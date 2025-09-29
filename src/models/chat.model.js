import mongoose from "mongoose";
const chatSchema =  new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },title:{
        type:String,
        required:true,
    },
    lastactivity:{
        type:Date,
        default:Date.now,
    }
},{timestramps:true});

const chatmodel = mongoose.model("chat",chatSchema);
export default chatmodel;