import mapInstance from "../api/mapApiInstance"

export const searchByPlace = async (place: String, listCategories: [String]) => {

    let str = "";
    listCategories.forEach((value, index)=>{
        str += value;
    })

    const placeSearch:any = await mapInstance.get(`/v1/geocode/search?text=${place}&format=json&apiKey=${process.env.REACT_APP_API_KEY}`)
    
    const data: any = await fetch(`/v2/places?categories=${str}&filter=place:${placeSearch.data.results[0].place_id}&apiKey=${process.env.REACT_APP_API_KEY}`);

    return data!.data.features;
}