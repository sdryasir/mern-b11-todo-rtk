import express from "express";
import { registerUser, loginUser, refresh, logOutUser } from "../controllers/authController.js";

const router = express.Router();


router.route('/auth/register').post(registerUser);

router.route('/auth/login').post(loginUser);
router.route('/auth/refresh').get(refresh);
router.route('/auth/logout').get(logOutUser);




export default router;
