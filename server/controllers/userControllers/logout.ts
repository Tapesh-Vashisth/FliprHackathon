import { Request, Response, NextFunction } from "express";
import express from "express"
import cookieParser from "cookie-parser";

const app = express()
app.use(cookieParser())

const logout = (req: any, res: Response, next: NextFunction) => {
    res.clearCookie('JWT_HTTPONLY_Cookie')
    req.id = ""
    req.status = ""

    return res
        .status(200)
        .json({ message: "Logged out!!" })
}

export default logout