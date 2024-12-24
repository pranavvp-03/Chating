import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected successfully😎`);
    } catch (error) {
        console.log("mongodb connection errror", error)
    }
}