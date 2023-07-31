import { Response } from "express";
import Place from "../../models/Place";

const getPlaceById = async (req: any, res: Response) => {
    const id = req.params.id

    let place = await Place.findOne({ place_id: id }).exec()

    return res
        .status(200)
        .json(place!)
}

export default getPlaceById