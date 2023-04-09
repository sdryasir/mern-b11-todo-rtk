import { User } from "../model/userSchema.js";
import bycrypt from 'bcryptjs'
import jwt from "jsonwebtoken";



export const registerUser = async (req, res, next) => {

    const user = req.body;
    user.password

    user.password = await bycrypt.hash(user.password, 10)

    try {
        await User.create(user)
        res.json({
            message: 'The User has been registered'
        })
    } catch (err) {
        next(err)
    }
}

export const loginUser = async (req, res, next) => {


    const { username, password } = req.body;


    if (!username) {
        next(new Error('Please provide username'))
    }

    if (!password) {
        next(new Error('Please provide password'))
    }

    const user = await User.findOne({ username })

    if (!user) {
        next(new Error('username is incorrect'))
    }

    const isPassMatched = await bycrypt.compare(password, user.password)


    if (!isPassMatched) {
        next(new Error('Password is incorrect'))
    }

    //JWT authentication
    const accessToken = jwt.sign({ user: user }, 'qweqwe2342342342344234sdfsdf', {  expiresIn:'5s' })
    const refreshToken = jwt.sign({ id: user._id }, 'qweqwe2342342342344234sdfsdf', {  expiresIn:'1y' })

    // set access token in cookie
    // res.cookie("accessToken", accessToken, {
    //     maxAge: 300000, // 5 minutes
    //     httpOnly: true,
    // });

    res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
    });

    res.json({ user, accessToken })

}


export const logOutUser = async (req, res, next) => {
    res.cookie("token", null, { expires: new Date(Date.now()) }).json({
        message:"You are logged out"
    })
}
