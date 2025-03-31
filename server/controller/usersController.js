import User from "../model/userModel.js";
import bcrypt from "bcrypt";

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

// Set avatar controller
// export async function setAvatar(res,req,next){
//     try{
//         const userId = req.params.id;
//         const avatarImage = req.body.image;
//         const userData = await User.findByIdAndUpdate(userId,{
//             IsAvatarImageSet:true,
//             avatarImage
//         })
//         return res.json({isSet:userData.IsAvatarImageSet,
//             image:userData.avatarImage
//         });
//     }
//     catch(e){
//         next(e);
//     }
// }


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
  

  // All Users Controller

  export async function getAllUsers(req,res,next){
    try{
      const users = await User.find({_id:{$ne: req.params.id}}).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ])
    }
    catch(err){
       next(err)
    }
  }
