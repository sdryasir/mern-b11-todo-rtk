import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();


router.route('/auth/register').post(registerUser);

router.route('/auth/login').post(loginUser);




export default router;
