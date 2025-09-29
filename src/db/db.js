import mongoose from "mongoose";
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    }catch(err){
        console.log("Error connecting to DB",err);
    }
}
export default connectDB;