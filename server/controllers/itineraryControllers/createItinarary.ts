import { Request, Response } from "express";
import Itinarary from "../../models/Itinarary";

const createItinarary = async (req: Request, res: Response) => {
    const { iName } = req.body

    let itinerary = new Itinarary({
        name: iName,
        places: []
    })

    try {
        await itinerary.save()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json({ message: "Created itinerary successfully!" })
}

export default createItinarary