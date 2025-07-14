import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";



// Register controller
export async function register(req,res,next){
    try{
        const {username,email,password} = req.body;
    const userNameCheck = await User.findOne({username})
    if(userNameCheck){
        return res.json({msg:"Username already taken",status:false})
    }
    const emailCheck = await User.findOne({email})
    if(emailCheck){
        return res.json({msg:"Email already taken",status:false})
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user = await User.create({
        email,
        username,
        password:hashedPassword
    })

    delete user.password;
    return res.json({status:true,user})
    }
    catch(err){
        next(err)
        
    }
}

// Login controller

export async function login(req,res,next){
    try{
        const {username,password} = req.body;
    const user = await User.findOne({username})
    if(!user){
        return res.json({msg:"Incorrect username or password",status:false})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.json({msg:"Incorrect username or password",status:false})
    }
    delete user.password;
    return res.json({status:true,user})
    }
    catch(err){
        next(err)
        
    }
}



export async function setAvatar(req, res, next) {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
  
      // Log the received data for debugging
      console.log('Received request to set avatar for user:', userId);
      console.log('Avatar Image:', avatarImage);
  
      // Check if the avatar image exists in the request
      if (!avatarImage) {
        return res.status(400).json({ error: 'Avatar image is required' });
      }
  
      // Find and update the user
      const userData = await User.findByIdAndUpdate(
        userId,
        { isAvatarImageSet: true, avatarImage },
        { new: true }
      );
  
      // Check if the user was found
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return the updated user data
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (e) {
      // Log the error
      console.error('Error in setAvatar controller:', e);
  
      // Send a generic error response
      return res.status(500).json({ error: 'An error occurred while setting avatar' });
    }
  }

  // DP Controller

  export async function dp(req, res) {

    try {
      const mimeType = req.file.mimetype; // e.g. image/jpeg
const base64Image = req.file.buffer.toString("base64");
const avatarImage = `data:${mimeType};base64,${base64Image}`;
      const userId = req.params.id;
  
      if (!req.file) {
        console.log("No file received");
        return res.status(400).json({ error: "No file uploaded" });
      }
  console.log(req.file);
  
      // const avatarImage = req.file.buffer.toString("base64");
  
      const userData = await User.findByIdAndUpdate(
        userId,
        { isAvatarImageSet: true, avatarImage },
        { new: true }
      );
  
      if (!userData) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (e) {
      console.error("Error in setAvatar controller:", e);
      return res.status(500).json({ error: "An error occurred while setting avatar" });
    }
  }
  









































  

  // All Users Controller

  export async function getAllUsers(req, res, next) {
    try {
      const userId = req.params.id;
  
      // Validate if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID format" });
      }
  
      // Fetch all users except the one with the given ID
      const users = await User.find({ _id: { $ne: userId } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
  
      // Send the response back to the client
      return res.json({ status: true, data: users });
    } catch (err) {
      console.error("Error in getAllUsers:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
