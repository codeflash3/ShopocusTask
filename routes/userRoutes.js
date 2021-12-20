import express from "express";
import { authUser, registerUser,getProfile } from "../controllers/userController.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.get("/profile",auth,getProfile);   //auth middleware

export default router;
