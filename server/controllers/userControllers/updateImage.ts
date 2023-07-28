import { Request, Response } from "express";
import User from "../../models/User";

const updateImage = async (req: Request, res: Response) => {
    console.log('update image')

    const { image, email } = req.body

    let user: any
    try {
        user = await User.findOne({ email: email }).exec()
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