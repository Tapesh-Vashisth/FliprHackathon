import { Response } from "express";
import Itinarary from "../../models/Itinarary";

const getItinarary = async (req: any, res: Response) => {
    const _id_itinarary = req.params.id

    let itinarary = await Itinarary.findById(_id_itinarary).populate("places.place")

    if (!itinarary)
        return res
            .status(404)
            .json({ message: "No such itinarary exists!" })

    return res
        .status(200)
        .json(itinarary)
}

export default getItinarary