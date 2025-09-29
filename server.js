import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import initsocketserver from "./src/socket.io/socket.server.js";
import { createServer } from "http";
const httpServer = createServer(app);
connectDB();
initsocketserver(httpServer);
httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});