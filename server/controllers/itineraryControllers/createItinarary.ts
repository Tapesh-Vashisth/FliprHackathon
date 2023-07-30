import { Request, Response } from "express";
import Itinarary from "../../models/Itinarary";
import User from "../../models/User";

const createItinarary = async (req: any, res: Response) => {
    const { iName } = req.body

    let user = await User.findById(req._id).exec()

    if (!user)
        return res
            .status(400)
            .json({ message: "No user found!" })

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