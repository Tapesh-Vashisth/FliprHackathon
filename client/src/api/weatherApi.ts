import config from "../helper/config"
import axios from "axios"

const weatherApi = async (lat: Number, lon: Number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.WEATHER_API_KEY}`

    const data: any = await axios.get(url)
    
    const result = 
    {
        weather_desc: data.weather.description,
        current_temp: data.main.temp,
        feels_like: data.main.feels_like,
        min: data.main.temp_min,
        max: data.main.temp_max,
        humidity: data.main.humidity
    }

    return result
}

export default weatherApi