import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./server/routes/userRoutes.js";
import messageRoutes from "./server/routes/messageRoutes.js";
import {Server} from "socket.io";


dotenv.config();

const app = express();

// Update your CORS configuration to this:
// Update your CORS middleware like this:
const allowedOrigins = [
  process.env.FRONTURL || "https://snappy-chatapp-five.vercel.app",
  "http://localhost:3000" // for local dev
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowedOrigin => 
      origin === allowedOrigin || 
      origin.includes(allowedOrigin.replace(/https?:\/\//, ''))
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Explicitly handle OPTIONS for your auth route
app.options("/api/auth/login", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0]);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(204).end();
});


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

const server = app.listen(process.env.PORT, function () {
    console.log(`Server started on port ${process.env.PORT}`);
});
const io = new Server(server,{
    cors:{
        origin:process.env.FRONTURL,
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
