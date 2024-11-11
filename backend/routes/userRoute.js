import express from "express";
import {
	login,
	logout,
	signup,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRoute = express.Router();

userRoute.get("/check-auth", verifyToken, checkAuth);

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

userRoute.post("/verify-email", verifyEmail);
userRoute.post("/forgot-password", forgotPassword);

userRoute.post("/reset-password/:token", resetPassword);

export default userRoute;
