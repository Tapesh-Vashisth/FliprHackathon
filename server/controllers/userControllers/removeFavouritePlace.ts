import { Response } from "express";
import Place from "../../models/Place";
import User from "../../models/User";

const removeFavouritePlace = async (req: any, res: Response) => {
    let { place_id } = req.body

    let place = await Place.findOne({ place_id: place_id }).exec()
    
    let user = await User.findById(req._id)
    
    const newFavs = user!.favouritePlaces.filter((x) => {
        console.log(x.place, typeof x.place);
        return x.place.toString() !== place!._id.toString()
    })

    user!.favouritePlaces = newFavs;
    
    try {
        await user!.save()
    } catch (err) {
        return res.status(500).json({message:'Unable to Remove From Favourites... Please Try Again!!'})
    }

    return res
        .status(200)
        .json({ message: "Place removed from favourites successfully!" })
}

export default removeFavouritePlace