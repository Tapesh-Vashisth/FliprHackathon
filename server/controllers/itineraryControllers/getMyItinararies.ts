import { Request, Response } from "express";
import Itinarary from "../../models/Itinarary";
import User from "../../models/User";
import Place from "../../models/Place";

const getMyItinararies = async (req: any, res: Response) => {
    let user = await User.findById(req._id).exec()

    if (!user) 
        return res
            .status(404)
            .json({ message: "User not found!" })
            
    const itinararyIds = user.itinarary

    let userItinararies: any = []
    for (let i=0; i<itinararyIds.length; i++) {
        let userItinarary = await Itinarary.findById(itinararyIds[i]).populate("places.place")
        userItinararies.push(userItinarary)
    }

    return res
        .status(200)
        .json(userItinararies)
}

export default getMyItinararies