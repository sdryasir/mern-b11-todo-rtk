import jwt from "jsonwebtoken";


export const isAuthenticatedUser = (req, res, next)=>{
    

    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

     const decode =  jwt.verify(token, 'qweqwe2342342342344234sdfsdf')
     

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