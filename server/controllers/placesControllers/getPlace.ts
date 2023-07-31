import { Request, Response } from "express";
import Place from "../../models/Place"
import axios from "axios"

export const getPlace = async (req: Request, res: Response) => {
    console.log(req.query.searchText);

    const response: any = {};

    const placeSearch:any = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${req.query.searchText}&format=json&apiKey=${process.env.REACT_APP_MAP_API_KEY}`);

    if(!placeSearch.data) {
        return res.status(404).json({message: "Place Not Found!"});
    }

    response.place = (placeSearch.data.results);
    console.log(response.place)

    for (let i=0; i<response.place.length; i++) {
        let { lon, lat, city, place_id, name } = response.place[i]
        if (!response.place[i].name || name.length <= 0) {
            console.log(response.place[i].name)
            try {
                name = response.place[i].properties && response.place[i].properties.formatted
            } catch (err) {}
        }

        let new_place = new Place({
            place_id,
            lon,
            lat,
            city,
            name: name || city
        })

        try {
            await new_place.save()
        } catch (err) {
            console.log("some error 1")
        }
    }

    let flag = 0
    if (!req.query.categories || req.query.categories!.length===0 || placeSearch.data.results.length===0) {
        console.log("no categories found in query search!")
        flag = 1
    }

    if (flag===1) {
        response.details = []
    }
    
    if (flag===0) {
        const data: any = await axios.get(`https://api.geoapify.com/v2/places?categories=${req.query.categories}&filter=place:${placeSearch.data.results[0].place_id}&limit=20&apiKey=${process.env.REACT_APP_MAP_API_KEY}`)
        
        if(!data.data) {
            return res.status(404).json({message: "Destinations Not Found!"});
        }
        
        response.details = data.data.features;
    
        for (let i=0; i<response.details.length; i++) {
            let { lat, lon, name, city, place_id } = response.details[i].properties
            if (response.details[i].properties && (!response.details[i].properties.name || name.length<=0)) {
                name = response.details[i].properties && response.details[i].properties.formatted
            }
            
            let new_place = new Place({
                place_id,
                lat,
                lon,
                city,
                name: name || city
            })
    
            try {
                await new_place.save()
            } catch (err) {
                console.log("some error 2")
            }
        }
    }

    return res.status(200).json(response);
}