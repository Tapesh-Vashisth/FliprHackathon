import axios from "axios"

const weatherApi = async (lat: Number, lon: Number) => {
    console.log(lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`

    try {
        const data: any = await axios.get(url)
        
        console.log(data);
        const result = 
        {
            weather_desc: data.data.weather[0].description,
            current_temp: data.data.main.temp,
            feels_like: data.data.main.feels_like,
            min: data.data.main.temp_min,
            max: data.data.main.temp_max,
            humidity: data.data.main.humidity,
            icon: data.data.weather[0].icon
        }
    
        return result
    } catch (err: any) {
        console.log(err);
        const result = {
            weather_desc: null, 
            current_temp: null,
            feels_like: null,
            min: null,
            max: null,
            humidity: null,
            icon: null
        }

        return result;
    }
}

export default weatherApi