import { Response, Request } from "express";
import User from "../../models/User";
import Place from "../../models/Place";
import mongoose from "mongoose";

const check = async (req: any, res: Response) => {
    console.log("check");
    console.log(req._id);
    let user: any
    user = await User.findById(req._id).exec()

    if (!user) 
        return res
            .status(404)
            .json({
                message:'User Not Found'
            });

    let favs = user.favouritePlaces
    let newfavs = []
    for (let i=0; i<favs.length; i++) {
        let place = await Place.findOne({
            _id: new mongoose.Types.ObjectId(favs[i].place)
        })
        newfavs.push({
            place: place!.place_id,
            description: favs[i].description
        })
    }

    let hold = {...user}
    hold.favs = newfavs
    console.log("user favs is : ", hold.favs)
    return res
        .status(200)
        .json(hold);
}

export default check;