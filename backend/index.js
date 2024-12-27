import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import authRoutes from "./routes/auth.js"
import messages from "./routes/message.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import bodyParser from "body-parser"

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth", authRoutes)
app.use("/api/message", messages)


const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB()
})