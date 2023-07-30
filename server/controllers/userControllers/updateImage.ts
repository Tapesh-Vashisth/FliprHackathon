import { Request, Response } from "express";
import User from "../../models/User";

const updateImage = async (req: any, res: Response) => {
    console.log('update image')

    const { image } = req.body

    let user: any
    try {
        user = await User.findById(req._id).exec()
    } catch (err) {
        return res
            .status(500)
            .json({message:'Internal error occurred!'});
    }

    user.image = image;

    try {
        await user.save();
    } catch (err) {
        return res
            .status(500)
            .json({message:'Internal error occurred!'});
    }

    return res
        .status(200)
        .json({ message: "Image updated successfully!" })

}

export default updateImage;