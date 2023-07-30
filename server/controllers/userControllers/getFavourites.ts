import User from "../../models/User";

const getFavourites = async (req: any, res: Response) => {
    let user = await User.findById(req._id).populate("favouritePlaces.place")
    console.log(user!.favouritePlaces)

    return res
        .status(200)
        .json(user!.favouritePlaces)
}

export default getFavourites