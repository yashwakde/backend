import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import usermodel from "../models/user.model.js";
import generateResponse from "../service/ai.service.js";
import messagemodel from "../models/message.model.js";
function initsocketserver(httpServer){

    const io = new Server(httpServer,{});

    io.use(async(socket,next)=>{
      const cookies = cookie.parse(socket.handshake.headers?.cookie ||"");
     if(!cookies.token){
        next(new Error(" Authentication error: No token provided"));
     }

     try{
        const decoded= jwt.verify(cookies.token,process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded.id);
        socket.user= user; 
        next();
    }catch(err){
        next(new Error("Authentication error: Invalid token"));
     }
    })
    io.on("connection",(socket)=>{
       
    
        socket.on("ai-message",async (messagePayload)=>{
             console.log("Received ai-message:",messagePayload);
            await messagemodel.create({
                user:socket.user._id,
                chat:messagePayload.chat,
                content:messagePayload.content,
                role:"user",
            })
            const chathistory = await messagemodel.find({chat:messagePayload.chat});
             const response = await generateResponse( chathistory.map(item=>{
                return{
                    role:item.role,
                    parts:[{text:item.content}],
                }
            }));
             await messagemodel.create({
                user:socket.user._id,
                chat:messagePayload.chat,
                content:response,
                role:"model",
             })
             socket.emit("ai-response",{
                content: response,
                chat:messagePayload.chat,
             })
            })

    })

}

export default initsocketserver;