import { Request, Response } from "express";
import Review from "../../models/Review";

const editReview = async (req: Request, res: Response) => {
    const { placeId, username, reviewBody, rating } = req.body

    let review: any
    try {
        review = await Review.findOne({
            placeId: placeId,
            username: username
        })
    } catch (err) {
        console.log("review find error")
        return res  
            .status(500)
            .json({ message: "Internal error!" })
    }

    review.reviewBody = reviewBody
    review.rating = rating

    try {
        await review.save()
    } catch (err) {
        console.log(err)
        return res  
            .status(400)
            .json({ message: "Internal error!" })
    }

    return res
        .status(200)
        .json({ message: "Review edited successfully!" })
}

export default editReview