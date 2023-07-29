import { Request, Response } from "express";
import Itinarary from "../../models/Itinarary";
import User from "../../models/User";

const createItinarary = async (req: Request, res: Response) => {
    const { iName, email } = req.body

    let itinarary = new Itinarary({
        name: iName,
        places: []
    })

    try {
        await itinarary.save()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred in saving itinarary!" })
    }

    let user = await User.findOne({
        email: email
    }).exec()

    user!.itinarary.push(itinarary._id)

    try {
        await user!.save()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred in saving user!" })
    }

    return res
        .status(200)
        .json({ message: "Created itinarary successfully!" })
}

export default createItinarary