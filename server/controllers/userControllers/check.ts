import { Response, Request } from "express";
import User from "../../models/User";

const check = async (req: any, res: Response) => {
    console.log("check");
    console.log(req._id);
    const user = await User.findById(req._id)
    if (!user) 
        return res
            .status(404)
            .json({
                message:'User Not Found'
            });

    return res
        .status(200)
        .json(user);
}

export default check;