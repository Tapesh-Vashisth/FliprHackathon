import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs"
import Otp from "../../models/Otp";
import { randomUUID } from "crypto";

const signup = async (req: Request, res: Response) => {
    console.log("signup")

    const { name, email, password, otp, image } = req.body
    const uuid: String = randomUUID();

    let existingUser: any
    try {
        existingUser = await User.findOne({ email: email }).exec()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    if (existingUser) {
        return res
            .status(409)
            .json({ message: "An account with this email already exists!" })
    }

    const hashedPassword = bcrypt.hashSync(password, 5)

    let otpmodel: any
    try {
        otpmodel = await Otp.findOne({ email: email }).exec()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    if (!otpmodel) {
        return res
            .status(404)
            .json({ message: "Otp not found for this user!" })
    }

    const otpDB = otpmodel.otp
    if (otp !== otpDB) {
        return res
            .status(400)
            .json({ message: "Wrong otp entered!" })
    }

    const user = new User({
        uuid: uuid,
        name,
        email,
        password: hashedPassword,
        emailVerified: true,
        image: image
    })

    try {
        await user.save()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    return res
        .status(201)
        .json({ message: "User signed up successfully!" })

}

export default signup