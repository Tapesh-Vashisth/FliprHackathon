import { Express, Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"
require("dotenv").config()

const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.JWT_HTTPONLY_Cookie
    console.log("token is : ", token)
    
    if (!token) {
        console.log("no token found")
        return res
            .status(400)
            .json({ status: false })
    }

    jwt.verify(token!, String(process.env.JWT_SECRET_KEY), (err: any, user: any) => {
        if (err) {
            res
            .status(400)
            .json({ status: false, token: "Cannot verify token!" })
        }

        req.email = user.email
        next()
    })
}

export default verifyJWT;