import { Express, Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"
require("dotenv").config()

const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    const cookies = req.headers.cookie
    const token = req.cookies.JWT_HTTPONLY_Cookie
    
    if (!token) {
        console.log("no token found!")
        return res
            .status(400)
            .json({ status: false })
    }
    
    jwt.verify(
        token!,
        String(process.env.ACCESS_TOKEN_SECRET),
        (err: any, decoded: any) => {
            if (err) {
                console.log("err in jwt verify")
                return res
                    .status(401)
                    .send();
            }
            req.email = decoded.email;
            console.log("verified!!")
            next();
        }
    );
}

export default verifyJWT;