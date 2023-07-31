import { Request, Response } from "express";
import User from "../../models/User";
import Place from "../../models/Place";

const addFavouritePlace = async (req: any, res: Response) => {
    const { place_id, description } = req.body

    let user = await User.findById(req._id).exec()

    let place = await Place.findOne({
        place_id: place_id
    })

    user!.favouritePlaces.push({
        place: place!._id,
        description: description
    })

    try {
        await user!.save()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json({ message: "Place added to favourites successfully!" })
}

export default addFavouritePlace