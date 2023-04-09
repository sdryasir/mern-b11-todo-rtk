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
    const accessToken = jwt.sign({ user: user }, 'qweqwe2342342342344234sdfsdf', {  expiresIn:'1m' })
    const refreshToken = jwt.sign({ user: user }, 'qweqwe2342342342344234sdfsdf', {  expiresIn:'1y' })

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


export const refresh = async (req, res, next) => {
    const { refreshToken } = req.cookies;

    if(!refreshToken){
        next(new Error('Uauthorized, Refresh Token Not Found!'))
    }

    jwt.verify( refreshToken, 'qweqwe2342342342344234sdfsdf', async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const user = await User.findOne({ _id: decoded.id }).exec()

            if (!user) return res.status(401).json({ message: 'Unauthorized, Invalid Refresh Token' })

            const accessToken = jwt.sign({ user: user }, 'qweqwe2342342342344234sdfsdf', {  expiresIn:'1m' })

            res.json({ accessToken })
        }
    )
}


export const logOutUser = async (req, res, next) => {
    const cookies = req.cookies
    if (!cookies?.refreshToken) return res.sendStatus(204) //No content
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None' })
    res.json({ message: 'Cookie cleared' })
}

