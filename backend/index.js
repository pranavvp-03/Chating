import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import authRoutes from "./routes/auth.js"
import { connectDB } from "./lib/db.js";

app.use(express.json())
app.use("/api/auth", authRoutes)


const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB()
})