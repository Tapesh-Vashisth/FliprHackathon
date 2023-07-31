import { Request, Response, NextFunction } from "express";
import express from "express"
import cookieParser from "cookie-parser";

const app = express()
app.use(cookieParser())

const logout = (req: any, res: Response, next: NextFunction) => {
    console.log('logout')

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    

    res.clearCookie("JWT_HTTPONLY_Cookie", {httpOnly: true, sameSite: "none", secure: true})

    return res
        .status(200)
        .json({ message: "Logged out!!" })
}

export default logout