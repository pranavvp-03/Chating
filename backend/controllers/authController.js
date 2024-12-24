import User from "../models/user.js";
import bcrypt from "bcryptjs"  
import { genarateToke } from "../utils.js";
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
        genarateToke(newUser._id,res)
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
   generateToke(user._id,res)
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
        res.cookie()
    } catch (error) {
        
    }
}