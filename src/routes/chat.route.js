import express from "express";
import { createChat } from "../controller/chat.controller.js";
import authUser from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/",authUser,createChat);
export default router;