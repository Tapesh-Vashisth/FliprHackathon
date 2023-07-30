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
        let userItinarary = await Itinarary.findById(itinararyIds[i]).exec()
        let custom_it: any = userItinarary
        for (let j=0; j<userItinarary!.places!.length; j++) {
            let place = await Place.findById(userItinarary!.places![j].place).exec()
            custom_it.places[j].place = place
        }
        userItinararies.push(custom_it)
    }

    return res
        .status(200)
        .json(userItinararies)
}

export default getMyItinararies