import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../api/axiosInstance";
import config from "../helper/config";
import CircularProgress from "@mui/material/CircularProgress";
import weatherApi from "../api/weatherApi";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import Rating from "@mui/material/Rating";

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
        icon: null,
    });
    const [rating, setRating] = React.useState(2);

    const getPlaceImage = async () => {
        // setImageLoading(true);
        console.log(props.data);
        try {
            const data = await fetch(
                `https://api.unsplash.com/search/photos?page=1?limit=1&query=${
                    props.data.place_name +
                    " " +
                    (props.data.categories.length > 0
                        ? props.data.categories[0].split(".").join(" ")
                        : "city")
                }&client_id=${config.UNSPLASH_ACCESS}`
            );
            const dataJ = await data.json();
            const result = dataJ.results;
            console.log(result);
            if (result && result.length > 0) {
                setImage(result[0].urls.full);
            }
            // setImageLoading(false);
        } catch (err: any) {
            console.log(err);
        }
    };

    const getWeatherData = async () => {
        setImageLoading(true);
        const response = await weatherApi(
            props.data.coordinates[0],
            props.data.coordinates[1]
        );
        console.log(response);
        setWeather(response);
        setImageLoading(false);
    };
    useEffect(() => {
        // getPlaceImage();
        getWeatherData();
        console.log(props);
    }, []);

    return (
        <div className="placesidebar">
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ padding: "10px" }}>
                    <CloseIcon
                        style={{ fontSize: "25px", cursor: "pointer" }}
                        onClick={() => props.setShowSidebar(false)}
                    />
                </div>
                {imageLoading ? (
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <CircularProgress size={"3rem"} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <>
                            <div className="placesidebar__name_rating">
                                <h1 style={{ fontSize: "3rem" }}>
                                    {props.data.place_name}
                                </h1>
                                <Rating
                                    name="read-only"
                                    value={rating}
                                    sx={{ fontSize: "2.4rem" }}
                                    readOnly
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
                            {weather.current_temp ? (
                                <div className="placesidebar__weather">
                                    <h1>Weather Today </h1>
                                    <div className="placesidebar__weather--data">
                                        {weather.icon && (
                                            <img
                                                src={
                                                    "http://openweathermap.org/img/wn/" +
                                                    weather.icon +
                                                    "@2x.png"
                                                }
                                                alt=""
                                            />
                                        )}
                                        <span>
                                            {weather.weather_desc
                                                ? weather.weather_desc
                                                : "Warm"}
                                            , feels like -{" "}
                                            {weather.feels_like
                                                ? weather.feels_like
                                                : "feels good!"}
                                        </span>
                                    </div>
                                    <div className="placesidebar__temperatures">
                                        <p style={{ fontSize: "1.6rem" }}>
                                            <span>
                                                <DeviceThermostatIcon />{" "}
                                                {weather.current_temp}{" "}
                                            </span>
                                            <span>
                                                <ArrowUpwardIcon />{" "}
                                                {weather.max}{" "}
                                            </span>
                                            <span>
                                                <ArrowDownwardIcon />{" "}
                                                {weather.min}{" "}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ) : null}
                            {props.data.categories &&
                            props.data.categories.length > 0 ? (
                                <div style={{ padding: "10px" }}>
                                    <h1>Categories - </h1>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "10px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        {props.data.categories.map((x: any) => {
                                            return (
                                                <div
                                                    style={{
                                                        padding: "6px",
                                                        borderRadius: "10px",
                                                        backgroundColor:
                                                            "lightgreen",
                                                        minHeight: "5px",
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            fontSize: "14px",
                                                            margin: "0",
                                                        }}
                                                    >
                                                        {x}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : null}

                            {
                                <div className="placesidebar__rate-experience">
                                    <span>Rate Your Experience</span>
                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(event, newValue: any) => {
                                            setRating(newValue);
                                        }}
                                        sx={{ fontSize: "3rem" }}
                                    />
                                </div>
                            }
                            <div className="placesidebar__reviews">
                                <p className="placesidebar__reviews--heading">
                                    Add Review
                                </p>
                                <textarea
                                    rows={5}
                                    placeholder="write your review"
                                ></textarea>
                                <div className="placesidebar__reviews--button">
                                    <button>Submit Review And Rating</button>
                                </div>
                            </div>
                        </>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlaceSidebar;
