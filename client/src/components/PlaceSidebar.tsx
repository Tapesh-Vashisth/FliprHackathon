import React, {useEffect, useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from "../api/axiosInstance";
import config from '../helper/config';
import CircularProgress from "@mui/material/CircularProgress"
import weatherApi from '../api/weatherApi';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import Rating from '@mui/material/Rating';

function PlaceSidebar(props: any) {
    const [image, setImage] = useState("");
    const [imageLoading, setImageLoading] = useState(true);
    const [weather, setWeather] = useState({
        weather_desc: null, 
        current_temp: null,
        feels_like: null,
        min: null,
        max: null,
        humidity: null,
        icon: null
    });
    const [rating, setRating] = React.useState(2);

    const getPlaceImage = async () => {
        setImageLoading(true);
        console.log(props.data);
        try {
            const data = await fetch(
                `https://api.unsplash.com/search/photos?page=1?limit=1&query=${props.data.place_name + " " + (props.data.categories.length > 0 ? props.data.categories[0].split(".").join(" ") : "city") }&client_id=${config.UNSPLASH_ACCESS}`
            );
            const dataJ = await data.json();
            const result = dataJ.results;
            console.log(result);
            if (result && result.length > 0) {
                setImage(result[0].urls.full);
            } 
            setImageLoading(false);
        } catch (err: any) {
            console.log(err);
        }
    };

    const getWeatherData = async () => {
        const response = await weatherApi(props.data.coordinates[0], props.data.coordinates[1]);
        console.log(response);
        setWeather(response);
    }



    useEffect(() => {
        getPlaceImage();
        getWeatherData();
        console.log(props);
    }, []);


    return (
        <div style = {{position: "absolute", zIndex: 1001, top: 0, right: 0, height: "100vh", width: "40vw", overflowY: "scroll", background: "white", display: "flex"}}>
                <div style = {{display: "flex", flexDirection: "column", flex: 1}}>
                    <div style = {{padding: "10px"}}>
                        <CloseIcon style = {{fontSize: "25px", cursor: "pointer"}} onClick = {() => props.setShowSidebar(false)} />
                    </div>
                    {   
                        imageLoading
                        ?
                        <div style = {{display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <div>
                                <CircularProgress size={"3rem"} />
                            </div>
                        </div>
                        :
                        <div>
                            <>
                                <div style = {{padding: "1rem"}}>
                                    <h1 style = {{fontSize: "3rem"}}>{props.data.place_name}</h1>
                                    <Rating
                                        name="read-only"
                                        value={rating}
                                    />
                                </div>

                                {/* <div style = {{position: "relative", padding: "0px 1rem"}}>
                                    {
                                        image
                                        ?
                                        <img src = {image} style = {{width: "100%", maxHeight: "60vh"}} alt='No image found' />
                                        :
                                        <img src = {require("../images/Image_not_available.png")} style = {{width: "100%"}} alt='No image found' />
                                    }
                                </div> */}

                                {
                                    weather.current_temp
                                    ?
                                    <div style = {{padding: "1rem"}}>
                                        <h1>Weather Today - </h1>
                                        <div style = {{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                            {
                                                weather.icon && <img src = {"http://openweathermap.org/img/wn/" + weather.icon + "@2x.png"} />
                                            }
                                            <span style = {{fontSize: "1.6rem"}}>{weather.weather_desc ? weather.weather_desc : "Warm"}, feels like - {weather.feels_like ? weather.feels_like: "feels good!"}</span>
                                        </div>
                                        <div>
                                            <p style = {{fontSize: "1.6rem"}}><DeviceThermostatIcon /> {weather.current_temp} <ArrowUpwardIcon /> {weather.max} <ArrowDownwardIcon /> {weather.min} </p>
                                        </div>
                                    </div>
                                    :
                                    null
                                }

                                {
                                    props.data.categories && props.data.categories.length > 0  
                                    ?
                                    <div style = {{padding: "10px"}}>
                                        <h1>Categories - </h1>
                                        <div style = {{display: "flex", flexDirection: "row", gap: "10px", marginTop: "10px"}}>
                                            {
                                                props.data.categories.map((x: any) => {
                                                    return (
                                                        <div style = {{padding: "6px", borderRadius: "10px", backgroundColor: "lightgreen", minHeight: "5px"}}>
                                                            <p style = {{fontSize: "14px", margin: "0"}}>{x}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    :
                                    null
                                }

                                {
                                    <div style = {{padding: "10px"}}>
                                        <span>Rate Your Experience</span>
                                        <Rating
                                            name="simple-controlled"
                                            value={rating}
                                            onChange={(event, newValue: any) => {
                                                setRating(newValue);
                                            }}
                                        />
                                    </div>
                                }
                            </>
                        </div>
                    }
                </div>
        </div>
    )
}

export default PlaceSidebar