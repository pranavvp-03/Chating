import express from "express"
import { protectRoute } from "../middlewares/authmidleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/messagecontroller.js";

const router = express.Router();

router.get("/users",protectRoute,getUsersForSidebar)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)

export default router