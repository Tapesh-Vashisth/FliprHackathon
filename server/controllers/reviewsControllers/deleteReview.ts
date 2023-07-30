import mongoose from "mongoose";
import Place from "../../models/Place";
import Review from "../../models/Review";
import { Request, Response } from "express"

const deleteReview = async (req: Request, res: Response) => {
    const { place_id, review_objectId } = req.body

    let place = await Place.findOne({ place_id: place_id }).exec()

    if (!place) 
        return res
            .status(404)
            .json({ message: "This place does not exist!!" })

    place.reviews = place.reviews.filter((x) => {
        return x !== new mongoose.Types.ObjectId(review_objectId)
    })

    try {
        await Review.findByIdAndDelete(review_objectId)
    } catch (err) {
        
    }

    return res
        .status(200)
        .json({ message: "Deleted review successfully!" })
}

export default deleteReview