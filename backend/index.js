import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./server/routes/userRoutes.js";
import messageRoutes from "./server/routes/messageRoutes.js";
import {Server} from "socket.io";


dotenv.config();

const app = express();

<<<<<<< HEAD
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
=======
const allowedOrigins = [
  "https://snappy-chatapp-five.vercel.app",
  "http://localhost:5000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // credentials: true // if using cookies or auth headers
}));

app.options("*", cors()); // Handle preflight

>>>>>>> 922d932c437221c9eb84fb03406b859a2debacf2
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
<<<<<<< HEAD
app.get("/test-cors", (req, res) => {
    res.json({ msg: "CORS test" });
  });

=======
  app.get("/test-cors", (req, res) => {
    res.json({ msg: "CORS test" });
  });
>>>>>>> 922d932c437221c9eb84fb03406b859a2debacf2
const server = app.listen(process.env.PORT, function () {
    console.log(`Server started on port ${process.env.PORT}`);
});
const io = new Server(server,{
    cors:{
<<<<<<< HEAD
        origin:process.env.FRONTEND_URL,
=======
        origin:"http://localhost:5173",
>>>>>>> 922d932c437221c9eb84fb03406b859a2debacf2
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
