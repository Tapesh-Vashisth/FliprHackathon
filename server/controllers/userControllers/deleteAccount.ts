import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs"

const deleteAccount = async (req: any, res: Response) => {
    console.log('delete account')
    const { password } = req.body

    let user: any
    try {
        user = await User.findById(req._id).exec()
    } catch (err) {
        return res
            .status(500)
            .json({message:'Internal error occurred!'});
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password)
    
    if (!passwordCompare) {
        return res
        .status(404)
        .json({ message: "Password is wrong!" })
    }
    
    let deletion: any
    try {
        deletion = await User.findByIdAndDelete(req._id).exec()
    } catch (err) {
        return res
            .status(500)
            .json({messge:'Internal error occurred!'});
    }

    return res
        .status(200)
        .json({ message: "Account deleted successfully!" })
}

export default deleteAccount