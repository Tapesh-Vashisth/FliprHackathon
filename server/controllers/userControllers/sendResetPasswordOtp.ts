import { randomUUID } from "crypto"
import { Request, Response } from "express"
import nodemailer from "nodemailer"
import Otp from "../../models/Otp"
import User from "../../models/User"

const uuid: string = randomUUID().substring(0, 6)
const html = `
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}></div>
    <h1Reset your Password</h1>
    <p>Your OTP is : ` + uuid + ` </p>
    <p>Kindly ignore this message if this was not you.</p>
`

const sendResetPasswordOtp = async (req: Request, res: Response) => {
    console.log("passwordOtp");

    const { email } = req.body
    let user: any
    try {
        user = await User.findOne({ email: email }).exec()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    if (!user) {
        return res
            .status(404)
            .json({ message: "No user found with the given email address!" })
    }

    let existingOtp: any
    try {
        existingOtp = await Otp.findOne({ email: email }).exec()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    if (existingOtp) {
        let deleteExistingOtp: any
        try {
            deleteExistingOtp = await Otp.deleteMany({ email: email }).exec()
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Internal error occurred!" })
        }
    }

    const otp = new Otp({
        otp: uuid.substring(0, 6),
        email: email
    })

    try {
        await otp.save()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    // sending a mail with nodemailer
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "travel.planner.pro.noreply@gmail.com",
            pass: String(process.env.NODEMAILER)
        }
    })

    let mailOptions = {
        from: "travel.planner.pro.noreply@gmail.com",
        to: email,
        subject: "Reset your password",
        html: html
    }

    transporter.sendMail(mailOptions, (err: any, success: any) => {
        if (err) {
            return res.status(400).json({message:'Error Sending OTP'})
        }
    })

    return res
        .status(200)
        .json({ message: "Otp sent for password reset!" })

}

export default sendResetPasswordOtp