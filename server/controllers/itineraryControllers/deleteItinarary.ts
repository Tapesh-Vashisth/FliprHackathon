import { Response } from "express";
import Itinarary from "../../models/Itinarary";
import User from "../../models/User";

const deleteItinarary = async (req: any, res: Response) => {
    const { _id_itinarary } = req.body

    let existingItinarary = await Itinarary.findByIdAndDelete(_id_itinarary).exec()

    let user = await User.findById(req._id).exec()

    if (!user) 
        return res
            .status(404)
            .json({ message: "No such user exists!" })

    user!.itinarary = user!.itinarary.filter((x) => {
        return x !== existingItinarary!._id
    })

    try {
        await user.save()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Unable to delete itinarary!" })
    }

    return res
        .status(200)
        .json({ message: "Deleted itinarary successfully!" })
}

export default deleteItinarary