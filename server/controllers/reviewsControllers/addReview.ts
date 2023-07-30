import { Request, Response } from "express";
import Review from "../../models/Review";
import Place from "../../models/Place";

const addReview = async (req: Request, res: Response) => {
    const { username, reviewBody, rating, place_id } = req.body

    const newReview = new Review({
        username,
        reviewBody,
        rating
    })

    try {
        await newReview.save()
    } catch (err) {
        console.log("save review error")
        return res
            .status(400)
            .json({ message: "Review not saved; Internal error!" })
    }

    let place = await Place.findOne({ place_id: place_id }).exec()
    place!.reviews.push(newReview._id)

    try {
        await place!.save()
    } catch (err) {
        console.log("save place error")
        return res
            .status(400)
            .json({ message: "Place not saved; Internal error!" })
    }

    return res
        .status(200)
        .json({ message: "Review saved successfully!" })
}

export default addReview