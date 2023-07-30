import { Request, Response } from "express";
import Place from "../../models/Place";
import axios from "axios";

const addPlace = async (req: Request, res: Response) => {
    const { searchQuery } = req.body
    let geocoding_api_url = `https://api.geoapify.com/v1/geocode/search?text=${searchQuery}&limit=10&format=json&apiKey=${process.env.MAP_API_KEY}`

    let data: any = await axios.get(geocoding_api_url)
    console.log(data.data)
    data = data.data.results

    let return_data = []

    for (let i=0; i<data.length; i++) {
        let { lon, lat, city, place_id } = data[i]
        console.log(data[i])

        return_data.push({
            place_id,
            lon,
            lat,
            city
        })

        let new_place = new Place({
            place_id,
            lon,
            lat,
            city
        })  

        try {
            await new_place.save()
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Internal error occurred, or place already exists" })
        }
    }

    return res
        .status(200)
        .json(return_data)
}

export default addPlace