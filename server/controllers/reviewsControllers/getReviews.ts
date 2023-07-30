import { Request, Response } from "express";
import Review from "../../models/Review";
import mongoose from "mongoose";
import Place from "../../models/Place";

const getReviews = async (req: Request, res: Response) => {
    const place_id = req.params.id

    let place = await Place.findOne({ place_id: place_id }).populate("reviews")

    if (!place) 
        return res
            .status(404)
            .json({ message: "No such place exists!" })

    return res
        .status(200)
        .json(place.reviews)
}

export default getReviews