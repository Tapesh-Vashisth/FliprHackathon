import mapInstance from "../api/mapApiInstance"
import config from "./config";

export const searchByPlace = async (place: String, listCategories: [String]) => {

    let str = "";
    listCategories.forEach((value, index)=>{
        str += value;
    })

    const placeSearch:any = await mapInstance.get(`/v1/geocode/search?text=${place}&format=json&apiKey=${config.API_KEY}`)
    
    const data: any = await fetch(`/v2/places?categories=${str}&filter=place:${placeSearch.data.results[0].place_id}&apiKey=${config.API_KEY}`);

    return data!.data.features;
}