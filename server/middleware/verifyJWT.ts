import { Express, Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"
require("dotenv").config()

const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    console.log("verifyJwt");
    // accessing the token from the headers
    let token = req.cookies.JWT_HTTPONLY_Cookie;
    console.log(token);

    // jwt verify function, validates the user's token
    jwt.verify(
        token,
        String(process.env.JWT_SECRET_KEY),
        (err: any, decoded: any) => {
            if (err) return res.status(401).json({message: "please login again"}); //invalid token
            req._id = decoded.id;
            next();
        }
    )
}

export default verifyJWT;