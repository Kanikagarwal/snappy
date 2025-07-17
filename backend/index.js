import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./server/routes/userRoutes.js";
import messageRoutes from "./server/routes/messageRoutes.js";
import {Server} from "socket.io";


dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL
}));
app.use(express.json());

app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoutes)

mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB connected successfully");
    
}).catch((err)=>{
    console.log(err.message);
    
})
app.get("/test-cors", (req, res) => {
    res.json({ msg: "CORS test" });
  });

const server = app.listen(process.env.PORT, function () {
    console.log(`Server started on port ${process.env.PORT}`);
});
const io = new Server(server,{
    cors:{
        origin:process.env.FRONTEND_URL,
        credentials:true,
    }
})

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })

    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})