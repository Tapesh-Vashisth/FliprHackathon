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
    console.log("ids", itinararyIds)

    let userItinararies: any = []
    for (let i=0; i<itinararyIds.length; i++) {
        let userItinarary = await Itinarary.findById(itinararyIds[i]).exec()
        console.log("userit", userItinarary)
        let arr = userItinarary!.places
        let placesInfo = []
        for (let i=0; i<arr.length; i++) {
            let placeInfo = await Place.findOne({place_id: arr[i].place}).exec()
            console.log(placeInfo)
            placesInfo.push(placeInfo)
        }
        let hold: any = {...userItinarary}
        hold.placesInfo = placesInfo
        userItinararies.push(hold)
    }

    console.log(userItinararies)

    return res
        .status(200)
        .json(userItinararies)
}

export default getMyItinararies