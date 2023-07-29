import { Request, Response } from "express";
import Itinarary from "../../models/Itinarary";

const addToItinarary = async (req: Request, res: Response) => {
    const { _id_itinarary, _id_place, date } = req.body

    let itinarary = await Itinarary.findById(_id_itinarary)

    itinarary!.places.push({
        place: _id_place,
        date: date
    })

    try {
        await itinarary!.save()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred in adding place to itinarary!" })
    }

    return res
            .status(200)
            .json({ message: "Added item to itinarary successfully!" })
}

export default addToItinarary