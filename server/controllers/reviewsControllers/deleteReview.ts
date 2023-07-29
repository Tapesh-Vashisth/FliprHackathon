import Review from "../../models/Review";
import { Request, Response } from "express"

const deleteReview = async (req: Request, res: Response) => {
    const { placeId, username } = req.body

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

    try {
        await review.delete()
    } catch (err) {
        console.log("error in deleting review")
        return res
            .status(500)
            .json({ message: "Internal error!" })
    }

    return res
        .status(200)
        .json({ message: "Review deleted successfully!" })
}

export default deleteReview