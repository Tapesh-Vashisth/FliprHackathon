import { Request, Response } from "express";
import Review from "../../models/Review";

const addReview = async (req: Request, res: Response) => {
    const { placeId, username, reviewBody, rating } = req.body

    const newReview = new Review({
        placeId,
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

    return res
        .status(200)
        .json({ message: "Review saved successfully!" })
}

export default addReview