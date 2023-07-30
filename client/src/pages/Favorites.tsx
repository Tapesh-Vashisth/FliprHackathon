import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axiosInstance from "../api/axiosInstance";
function Favorites() {
    const [favourites, setFavourites] = useState([{}]);
    const getFavourites = async () => {
        const data: any = await axiosInstance.get("/user/favourites");
        setFavourites(data.data);
    };
    useEffect(() => {
        getFavourites();
    }, []);
    console.log(favourites);
    return (
        <div className="user-profile__favourites">
            <div className="user-profile__favourites--details">
                <div className="user-profile__favourites--heading">
                    <h1>Favourites</h1>
                </div>
                <div className="user-profile__favourites--places">
                    {favourites.map((places: any) => {
                        return (
                            <div className="user-profile__favourites--places--card">
                                <div className="user-profile__favourites--places--card--image">
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/002/098/203/non_2x/silver-tabby-cat-sitting-on-green-background-free-photo.jpg"
                                        alt="name"
                                    />
                                </div>
                                <div className="user-profile__favourites--places--card--data">
                                    {/* <p>{places.place.name}</p> */}
                                    <p>
                                        <LocationOnIcon
                                            sx={{ fontSize: "1.5rem" }}
                                        />{" "}
                                        {/* {places.place.city} */}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Favorites;
