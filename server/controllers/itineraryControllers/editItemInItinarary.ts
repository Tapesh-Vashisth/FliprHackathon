import { Request, Response } from "express";
import Itinarary from "../../models/Itinarary";

const editItemInItinarary = async (req: Request, res: Response) => {
    const { _id_place, date, description } = req.body
    const _id_itinarary = req.params.id

    let itinarary = await Itinarary.findById(_id_itinarary).exec()

    itinarary!.places = itinarary!.places.map((value, index) => {
        if (value.place===_id_place) {
            value.date = date
            value.description = description
        }
        return value
    })

    console.log(itinarary!.places)

    try {
        await itinarary!.save()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred in editing itinarary!" })
    }

    return res
        .status(200)
        .json({ message: "Itinarary edited successfully!" })
}

export default editItemInItinarary