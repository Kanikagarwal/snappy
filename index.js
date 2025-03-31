import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./server/routes/userRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)

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
