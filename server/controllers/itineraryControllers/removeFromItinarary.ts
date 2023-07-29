import { Request, Response } from "express";
import Itinarary from "../../models/Itinarary";

const removeFromItinarary = async (req: Request, res: Response) => {
    const { _id_itinarary, _id_place } = req.body

    let itinarary = await Itinarary.findById(_id_itinarary)

    itinarary!.places = itinarary!.places.filter((x) => {
        x.place !== _id_place
    })
    
    try {
        await itinarary!.save()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json({
            message: "Removed place from itinarary successfully!"
        })
}

export default removeFromItinarary