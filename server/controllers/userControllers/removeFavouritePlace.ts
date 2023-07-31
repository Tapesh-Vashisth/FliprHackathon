import { Response } from "express";
import Place from "../../models/Place";
import User from "../../models/User";

const removeFavouritePlace = async (req: any, res: Response) => {
    let { place_id } = req.body

    let place = await Place.findOne({ place_id: place_id }).exec()

    let user = await User.findById(req._id)

    user!.favouritePlaces = user!.favouritePlaces.filter((x) => {
        return x.place !== place!._id
    })

    try {
        await user!.save()
    } catch (err) {

    }

    return res
        .status(200)
        .json({ message: "Place removed from favourites successfully!" })
}

export default removeFavouritePlace