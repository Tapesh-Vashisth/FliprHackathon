import React, {useEffect} from "react";
import { useState } from "react";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import ProfileImageUpdate from "../components/UpdateImage";
import Profile from "./Profile";
import Favorites from "./Favorites";

function Dashboard(props: any) {
    const user = useAppSelector((state) => state.user);


    const [Itenery, setItenery] = useState(false);
    const [favorites, setFavourites] = useState(false);
    const [profile, setProfile] = useState(false);
    const navigate = useNavigate();

    const handleItenaryClick = () => {
        navigate("/dashboard/itinerary")
        setItenery(true);
        setFavourites(false);
        setProfile(false);
    };
    const handleFavoritesClick = () => {
        navigate("/dashboard/favorites")
        setFavourites(true);
        setProfile(false);
        setItenery(false);
    };
    const handleProfileClick = () => {
        navigate("/dashboard")
        setProfile(true);
        setFavourites(false);
        setItenery(false);
    };
    
    const editPencil = (
        <svg viewBox="0 0 24 24" fill="" width="24" height="18">
            <path
                fillRule="evenodd"
                d="M18.8525,7.543 L17.7515,8.644 L15.3565,6.248 L16.4575,5.147 C16.5555,5.05 16.6835,5.001 16.8105,5.001 C16.9385,5.001 17.0665,5.05 17.1645,5.147 L18.8525,6.835 C19.0475,7.03 19.0475,7.348 18.8525,7.543 L18.8525,7.543 Z M8.1895,18.206 C8.1185,18.276 8.0275,18.324 7.9295,18.344 L5.1275,18.873 L5.6575,16.07 C5.6755,15.972 5.7225,15.882 5.7945,15.811 L14.6495,6.955 L17.0445,9.351 L8.1895,18.206 Z M19.5595,6.128 L17.8715,4.44 C17.2865,3.856 16.3355,3.856 15.7505,4.44 L5.0875,15.103 C4.8735,15.317 4.7295,15.588 4.6745,15.886 L4.0085,19.407 C3.9775,19.569 4.0295,19.736 4.1465,19.854 C4.2415,19.948 4.3685,20 4.4995,20 C4.5305,20 4.5615,19.997 4.5925,19.991 L8.1165,19.326 C8.4145,19.269 8.6855,19.125 8.8965,18.912 L19.5595,8.25 C20.1445,7.665 20.1445,6.713 19.5595,6.128 L19.5595,6.128 Z"
            ></path>
        </svg>
    );

    const IteneryStyles = Itenery
        ? "user-profile__middle--active"
        : "user-profile__middle--button";
    const ProfileStyles = profile
        ? "user-profile__middle--activelast"
        : "user-profile__middle--button";
    const FavoriteStyles = favorites
        ? "user-profile__middle--active"
        : "user-profile__middle--button";

    useEffect(() => {
        console.log(props.type);
        if (props.type === "profile") {
            handleProfileClick();
        } else if (props.type === "itinerary") {
            handleItenaryClick();
        } else {
            handleFavoritesClick();
        }
    }, [])

    return (
        <>
            <Header />
            <div className="user-profile">
                <div className="user-profile__upper">
                    <ProfileImageUpdate />
                    <h1>{user.name}</h1>
                </div>
                <div className="user-profile__middle">
                    <button
                        className={IteneryStyles}
                        onClick={handleItenaryClick}
                    >
                        Itenery
                    </button>
                    <button
                        className={FavoriteStyles}
                        onClick={handleFavoritesClick}
                    >
                        Favorites
                    </button>
                    <button
                        className={ProfileStyles}
                        onClick={handleProfileClick}
                    >
                        Profile
                    </button>
                </div>
                {profile && (<Profile />)}
                {favorites && (<Favorites />)}
            </div>
        </>
    );
}

export default Dashboard;
