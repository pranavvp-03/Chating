import User from "../models/user.js";
import bcrypt from "bcryptjs"  
import { genarateToken } from "../utils.js";
import cloudinary from "../lib/cloudinary.js";


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your cloud name
    api_key: process.env.CLOUDINARY_API_KEY,      // Replace with your API key
    api_secret: process.env.CLOUDINARY_API_SECRET // Replace with your API secret
});


export const  signUp = async (req,res)=>{
    const {fullName,email,password} = req.body
   try {
    if(!fullName || !email || !password){
        return res.status(400).json({message : "all fields are required"})
    }
    if(password.length < 6){
        return res.status(400).json({message : "password should be at least 6 characters"})
    }

    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({message : "User already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new User({
        fullName,
        email,
        password:hashedPassword
    })
    if(newUser){
        genarateToken(newUser._id,res)
        await newUser.save()
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,
        })
    }else{
        res.status(400).json({message : "invalid user data"})
    }
   } catch (error) {
    console.log("error in signUp controller",error.message)
    res.status(500).json({message : "internal server error"})
   }
}

export const login = async(req,res)=>{
    const {email,password}= req.body
   try {
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message : "user not found"})
    }

   const isMatch = await bcrypt.compare(password, user.password)

   if(!isMatch){
    return res.status(400).json({message : "invalid credentials"})  
   }
   genarateToken(user._id,res)
   res.status(200).json({
    _id:user._id,
    fullName:user.fullName,
    email:user.email,
    profilePic:user.profilePic
   })
   } catch (error) {
    console.log("error in login controller",error.message)
    res.status(500).json({message : "internal server error"})
   }
}

export const logout = async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message : "logout successfully"})
    } catch (error) {
        console.log("error in logout controller",error.message)
        res.status(500).json({message :"internal server error"})
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id
        if(!profilePic){
            return res.status(400).json({message : "profile pic is required"})
        }
        console.log("second")
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        console.log(uploadResponse,"upload response is this")
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic: uploadResponse.secure_url},
            { new : true}
        )
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in updateprofiles",error.message)
        res.status(500).json({message : "internal server error"})
    }
}

export const checkAuth = async (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in check auth",error.message)
        res.status(500).json({message: "internal server error"})
    }
}