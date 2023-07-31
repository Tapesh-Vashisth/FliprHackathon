import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

function Favorites() {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(false);

    const getFavourites = async () => {
        const data: any = await axiosInstance.get("/user/favourites");
        setFavourites(data.data);
    };

    useEffect(() => {
        setLoading(true);
        
        const func = async () => {
            await getFavourites();
        }
        
        try {
            func();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast.error('Unable to fetch Favourites!', {
                position: "top-right",
            });
        }

    }, []);

    return (
        <div className="user-profile__favourites">
            <div className="user-profile__favourites--details">
                <div className="user-profile__favourites--heading">
                    <h1>Favourites</h1>
                </div>
                <div className="user-profile__favourites--places">
                    {loading ? <CircularProgress size={"5rem"} />
                        :
                        favourites.map((places: any) => {
                            return (
                                <div className="user-profile__favourites--places--card">
                                    <div className="user-profile__favourites--places--card--image">
                                        <img
                                            src="https://i0.wp.com/farm4.static.flickr.com/3408/3410783929_051d93bc86.jpg"
                                            alt="name"
                                        />
                                    </div>
                                    <Link to={`/map/favourite?lat=${places.place.lat}&lon=${places.place.lon}&place_id=${places.place.place_id}&place_name=${places.place.name}`} style={{ textDecoration: 'none', color: '#000' }}>
                                        <div className="user-profile__favourites--places--card--data" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <h3>{places.place.name}</h3>
                                            <p>
                                                <LocationOnIcon
                                                    sx={{ fontSize: "2rem" }}
                                                />{" "}
                                                {places.place.city}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Favorites;
