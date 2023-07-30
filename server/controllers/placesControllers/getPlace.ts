import { Request, Response } from "express";
import Place from "../../models/Place"
import axios from "axios"

export const getPlace = async (req: Request, res: Response) => {
    console.log(req.query.searchText);

    const response: any = {};

    const placeSearch:any = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${req.query.searchText}&format=json&apiKey=${process.env.MAP_API_KEY}`);

    if(!placeSearch.data) {
        return res.status(404).json({message: "Place Not Found!"});
    }

    response.place = (placeSearch.data.results);

    for (let i=0; i<response.place.length; i++) {
        let { lon, lat, city, place_id } = response.place[i]
        console.log(response.Place[i])

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

    if (!req.query.categories || req.query.categories!.length===0 || placeSearch.data.results.length===0) {
        return res
            .status(404)
            .json({ message: "No places or cities with the search query was found!!" })
    }
    
    const data: any = await axios.get(`https://api.geoapify.com/v2/places?categories=${req.query.categories}&filter=place:${placeSearch.data.results[0].place_id}&limit=20&apiKey=${process.env.MAP_API_KEY}`)
    
    if(!data.data) {
        return res.status(404).json({message: "Destinations Not Found!"});
    }
    
    response.details = data.data.features;

    for (let i=0; i<response.details.length; i++) {
        let { lat, lon, name, city, place_id } = response.details[i]

        let new_place = new Place({
            place_id,
            lat,
            lon,
            city,
            name
        })

        try {
            await new_place.save()
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Internal error occurred, or place already exists" })
        }
    }

    return res.status(200).json(response);
}