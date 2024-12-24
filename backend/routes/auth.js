import express from "express";
import { checkAuth, login, logout, signUp, updateProfile } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authmidleware.js";
const router = express.Router();

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update-profile",protectRoute,updateProfile)
router.get("/check",protectRoute,checkAuth)


export default router