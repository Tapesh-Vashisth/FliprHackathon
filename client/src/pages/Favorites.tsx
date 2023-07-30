import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
function Favorites() {
    return (
        <div className="user-profile__favourites">
            <div className="user-profile__favourites--details">
                <div className="user-profile__favourites--heading">
                    <h1>Favourites</h1>
                </div>
                <div className="user-profile__favourites--places">
                    <div className="user-profile__favourites--places--card">
                        <div className="user-profile__favourites--places--card--image">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/002/098/203/non_2x/silver-tabby-cat-sitting-on-green-background-free-photo.jpg"
                                alt="name"
                            />
                        </div>
                        <div className="user-profile__favourites--places--card--data">
                            <p>Name</p>
                            <p>
                                <LocationOnIcon sx={{ fontSize: "1.5rem" }} />{" "}
                                CityName
                            </p>
                            <p>Description...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Favorites;
