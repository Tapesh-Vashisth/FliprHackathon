import { Express, Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"
require("dotenv").config()

const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    console.log("verifyJwt");
    // accessing the token from the headers
    let token = req.cookies.JWT_HTTPONLY_Cookie;
    console.log(token);

    jwt.verify(token!, String(process.env.JWT_SECRET_KEY), (err: any, user: any) => {
        if (err) {
            res
            .status(400)
            .json({ status: false, token: "Cannot verify token!" })
        }

        req._id = user._id
        next()
    })
}

export default verifyJWT;