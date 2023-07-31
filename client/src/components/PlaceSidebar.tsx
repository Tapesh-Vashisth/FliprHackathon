import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../api/axiosInstance";
import config from "../helper/config";
import Moment from "react-moment";
import CircularProgress from "@mui/material/CircularProgress";
import weatherApi from "../api/weatherApi";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import Rating from "@mui/material/Rating";
import { useAppSelector } from "../app/hooks";
import { toast } from "react-toastify";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";

function PlaceSidebar(props: any) {
    const user = useAppSelector((state) => state.user);
    const [image, setImage] = useState("");
    const [Loading, setLoading] = useState(true);
    const [rateLoading, setRateLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isReviewed, setIsReviewed] = useState(false);
    const [weather, setWeather] = useState({
        weather_desc: null,
        current_temp: null,
        feels_like: null,
        min: null,
        max: null,
        humidity: null,
        icon: null,
    });
    const [averageRating, setAverageRating] = useState(0);
    const [rating, setRating] = React.useState(2);
    const [review, setReview] = useState("");
    const [itenarires, setItenararies] = useState([]);
    const [selectItn, SetSelecItn] = useState("");
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");

    const getWeatherData = async () => {
        const response = await weatherApi(
            props.data.coordinates[0],
            props.data.coordinates[1]
        );
        console.log(response);
        setWeather(response);
    };

    const addReviewHandler = async (e: any) => {
        e.preventDefault();
        console.log(review, rating);

        setRateLoading(true);
        try {
            const response = await axiosInstance.post("/place/addreview", {
                username: user.name,
                place_id: props.data.place_id,
                rating: rating,
                reviewBody: review,
                email: user.email,
            });
            toast.success("Review submitted successfully");
            setRateLoading(false);
            getReviews();
        } catch (err: any) {
            toast.error(err.response.data.message, { position: "top-right" });
            setRateLoading(false);
        }
    };

    const getReviews = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                "/place/reviews/" + props.data.place_id
            );
            console.log(response.data);

            let len = response.data.length;
            let totalRating = 0;
            let holdReview = response.data.filter((x: any) => {
                totalRating += x.rating;
                return x.email === user.email;
            });

            setAverageRating(totalRating / len);

            if (holdReview.length > 0) {
                setIsReviewed(true);
                setReview(holdReview[0].reviewBody);
                setRating(holdReview[0].rating);
            }

            setReviews(response.data);

            setLoading(false);
        } catch (err: any) {
            toast.error(err.response.data.message, { position: "top-right" });
            setLoading(false);
        }
    };

    const editReviewHandler = async (e: any) => {
        e.preventDefault();
        setRateLoading(true);
        try {
            const response = await axiosInstance.post("/place/editreview", {
                username: user.name,
                place_id: props.data.place_id,
                rating: rating,
                reviewBody: review,
            });

            console.log(response);
            toast.success("Review Edited Successfully", {
                position: "top-right",
            });
            setRateLoading(false);
            getReviews();
        } catch (err: any) {
            toast.error(err.response.data.message, { position: "top-right" });
            setRateLoading(false);
        }
    };

    const getItn = async () => {
        try {
            const response = await axiosInstance.get(
                "/itinarary/myitinararies"
            );
            setItenararies(response.data);
        } catch (err: any) {
            console.log(err);
        }
    };

    const addtoItn = async (e: any) => {
        try {
            e.preventDefault();
            console.log(props);
            console.log(date, desc, selectItn);
            const response = await axiosInstance.put(
                `/itinarary/add/${selectItn}`,
                {
                    place_id: props.data.place_id,
                    date: date,
                    description: desc,
                }
            );
            toast.success("Added to Itinarary", {
                position: "top-left",
            });
        } catch (err) {
            toast.error("some error occured", {
                position: "top-left",
            });
        }
    };

    useEffect(() => {
        setLoading(true);
        getWeatherData();
        getReviews();
        getItn();
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
                {Loading ? (
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
                                    value={averageRating}
                                    sx={{ fontSize: "2.4rem" }}
                                    readOnly
                                />
                            </div>

                            <form
                                onSubmit={addtoItn}
                                className="placesidebar__select"
                                style={{
                                    padding: "1rem 2rem",
                                    textAlign: "center",
                                }}
                            >
                                <p>Add To Your Itinarary</p>
                                <div className="placesidebar__select--div">
                                    <select
                                        value={selectItn}
                                        onChange={(e: any) => {
                                            console.log(e.target.value);
                                            SetSelecItn(e.target.value);
                                        }}
                                        aria-label="Default select example"
                                    >
                                        <option value="test">
                                            Add To Your Itenerary
                                        </option>
                                        {itenarires.map(
                                            (itenarary: any, index) => {
                                                return (
                                                    <option
                                                        value={itenarary._id}
                                                        key={index}
                                                    >
                                                        {itenarary._doc.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                    <input
                                        type="date"
                                        name=""
                                        id="date"
                                        value={date}
                                        onChange={(e) =>
                                            setDate(e.target.value)
                                        }
                                    />
                                    <input
                                        type="desc"
                                        name=""
                                        id="desc"
                                        value={desc}
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                        placeholder="description"
                                    />
                                </div>
                                <div className="placesidebar__select-buttondiv">
                                    <button type="submit">Add!</button>
                                </div>
                            </form>

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
                                            flexWrap: "wrap",
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
                                    <span>
                                        {isReviewed ? "Edit" : "Rate"} Your
                                        Experience
                                    </span>
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
                            <form
                                className="placesidebar__reviews"
                                onSubmit={
                                    isReviewed
                                        ? editReviewHandler
                                        : addReviewHandler
                                }
                            >
                                <p className="placesidebar__reviews--heading">
                                    {isReviewed ? "Edit" : "Add"} Review
                                </p>
                                <textarea
                                    rows={5}
                                    placeholder="write your review"
                                    value={review}
                                    onChange={(e: any) =>
                                        setReview(e.target.value)
                                    }
                                ></textarea>
                                <div className="placesidebar__reviews--button">
                                    <button>
                                        {rateLoading ? (
                                            <CircularProgress size={"1.5rem"} />
                                        ) : isReviewed ? (
                                            "Edit Review And Rating"
                                        ) : (
                                            "Submit Review And Rating"
                                        )}
                                    </button>
                                </div>
                            </form>
                            <div className="placesidebar__othersReviews">
                                {reviews.map((review: any, index) => {
                                    return review.email !== user.email ? (
                                        <div className="placesidebar__othersReviews--reviewCard">
                                            <p>
                                                <Moment fromNow>
                                                    {review.createdAt}
                                                </Moment>
                                            </p>
                                            <p>
                                                {review.username}:{" "}
                                                <span>{review.reviewBody}</span>
                                            </p>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlaceSidebar;
