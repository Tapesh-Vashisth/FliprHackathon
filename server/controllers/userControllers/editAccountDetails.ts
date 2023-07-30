import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs"

const editAccountDetails: any = async (req: any, res: Response) => {
    console.log("update account")

    const { name, password, newPassword } = req.body
    console.log(req._id, req.body);

    let user: any
    try {
        user = await User.findById(req._id).exec()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    if (name !== user.name) {
        user.name = name
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    
    if (!passwordCompare) {
        return res
            .status(409)
            .json({ message: "Wrong password entered : Cannot edit account details!" })
    }

    if (newPassword && newPassword.length > 0) {
        const hashedPassword = bcrypt.hashSync(newPassword, 5)
        user.password = hashedPassword
    }

    try {
        await user.save();
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json({ message: "Account details changed successfully!" })
}

export default editAccountDetails;
