import User from "../../models/User";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Response, NextFunction } from "express";
import Place from "../../models/Place";

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
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    let favs = existingUser.favouritePlaces
    let newfavs = []
    for (let i=0; i<favs.length; i++) {
        let place = await Place.findById(favs[i].place)
        newfavs.push(place!.place_id)
    }

    existingUser.favs = newfavs

    let hold = {...existingUser}
    hold.favs = newfavs

    return res
        .status(200)
        .json(hold)
}

export default login
