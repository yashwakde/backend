import chatmodel from "../models/chat.model.js";

async function createChat(req,res){
    const {title} = req.body;
    const user =  req.user;

    const chat = await chatmodel.create({
        user:user._id,
        title,
    })

    res.status(201).json({
    message:"chat created successfully",
    chat:{
        id:chat._id,
        title:chat.title,
        lastactivity:chat.lastactivity,
        user:chat.user,
    }
    })
}

export {createChat};