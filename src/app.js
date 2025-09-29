import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
/* define routes */
import userRouter from "./routes/user.route.js";
import chatRouter  from "./routes/chat.route.js"
const app = express();

/* using express middlewares */
app.use(express.json());
app.use(cookieParser());

app.use("/chatgptclone/user",userRouter);
app.use("/chatgptclone/chat",chatRouter);
export default app;