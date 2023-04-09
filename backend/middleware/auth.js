import jwt from "jsonwebtoken";


export const isAuthenticatedUser = (req, res, next)=>{
    
    const { accessToken, refreshToken } = req.cookies;

    if(!accessToken){
        next(new Error('Please Login to access this resource'))
    }

     const decode =  jwt.verify(accessToken, 'qweqwe2342342342344234sdfsdf')

    req.user = decode.user;

    next()
}

export const isAuthorizedUser = (...roles)=>{
    return (req , res, next)=>{
        if(!roles.includes(req.user.role)){
            next(new Error('You are not authorized to use this resource'))
        }
        next()
    }
}