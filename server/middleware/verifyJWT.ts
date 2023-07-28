import { Express, Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"
require("dotenv").config()

const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    console.log("verifyJwt");
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer')) 
        return res
        .status(401)
        .send();
    
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        String(process.env.ACCESS_TOKEN_SECRET),
        (err: any, decoded: any) => {
            if (err) 
                return res
                    .status(401)
                    .send();
            req.uuid = decoded.uuid;
            next();
        }
    );
}

export default verifyJWT;