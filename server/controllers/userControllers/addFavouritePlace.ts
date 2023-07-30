import { Request, Response } from "express";
import User from "../../models/User";
import Place from "../../models/Place";

const addFavouritePlace = async (req: Request, res: Response) => {
    const { place_id, email } = req.body

    let user = await User.findOne({
        email: email
    })

    let place = await Place.findOne({
        place_id: place_id
    })

    user!.favouritePlaces.push({
        place: place!._id,
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