import { Request, Response } from "express";
import Itinarary from "../../models/Itinarary";
import Place from "../../models/Place";

const addToItinarary = async (req: Request, res: Response) => {
    const { place_id, date, description } = req.body
    const _id_itinarary = req.params.id

    let place = await Place.findOne({
        place_id: place_id
    }).exec()

    if (!place) {
        return res
            .status(404)
            .json({ message: "No such place exists!" })
    }

    let itinarary = await Itinarary.findById(_id_itinarary).exec()

    if (!itinarary) 
        return res
            .status(404)
            .json({ message: "Itinarary does not exist!" })

    itinarary!.places.push({
        place: place!.place_id,
        date: new Date(date),
        description: description
    })

    try {
        await itinarary!.save()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ message: "Internal error occurred in adding place to itinarary!" })
    }

    return res
            .status(200)
            .json({ message: "Added item to itinarary successfully!" })
}

export default addToItinarary