import User from "../../models/User";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Response, NextFunction } from "express";

const login = async (req: any, res: Response, next: NextFunction) => {
    
    const { email, password } = req.body
    var existingUser: any
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    if (!existingUser) {
        return res
        .status(404)
        .json({ 
                message: "User does not exist. You should sign up instead." 
            })
    }
    
    const passwordCompare = await bcrypt.compare(password, existingUser.password)
    
    if (!passwordCompare) {
        return res
            .status(400)
            .json({ message: "Password is wrong" })
    }

    const token = jwt.sign({ id: existingUser._id }, String(process.env.JWT_SECRET_KEY), {
        expiresIn: "3h"
    })

    res.cookie('JWT_HTTPONLY_Cookie', token, {
        path: '/',
        expires: new Date(Date.now() + 1000*60*60*3),
        httpOnly: true,
        sameSite: 'lax'
    })

    return res
        .status(200)
        .json(existingUser)
}

export default login
