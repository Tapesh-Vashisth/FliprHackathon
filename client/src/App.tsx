import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "./components/Loaders/PageLoader";
import axiosInstance from "./api/axiosInstance";
import { useAppDispatch } from "./app/hooks";
import { userActions } from "./features/userSlice";
import Navigation from "./components/Navigation";

function App() {
    const [screenLoad, setScreenLoad] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const getUserData = async () => {
        setScreenLoad(true);
        try {
            const response = await axiosInstance.get("/user/check");
            console.log(response);
            dispatch(userActions.setState(response.data));
            setScreenLoad(false);
        } catch (err: any) {
            console.log(err);
            setScreenLoad(false);
        }
    }

    const storeLocation = (GeolocationPosition: GeolocationPosition) => {
        console.log(GeolocationPosition);
        let coords = GeolocationPosition.coords;
        
        dispatch(userActions.setLocation({latitude: coords.latitude, longitude: coords.longitude}));
    }

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.permissions.query({name: "geolocation"})
            .then((result) => {
                if (result.state === "granted") {
                    console.log("granted", result.state);
                    navigator.geolocation.getCurrentPosition(storeLocation, () => {}, {timeout: 5000, maximumAge: 0})
                    //If granted then you can directly call your function here
                } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(storeLocation, () => {}, {timeout: 5000, maximumAge: 0})
                    console.log(result.state);
                } else if (result.state === "denied") {
                    //If denied then you have to show instructions to enable location
                }
                
                result.onchange = function () {
                    if (result.state === "granted") {
                        console.log("granted", result.state);
                        navigator.geolocation.getCurrentPosition(storeLocation, () => {}, {timeout: 5000, maximumAge: 0})
                        //If granted then you can directly call your function here
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(storeLocation, () => {}, {timeout: 5000, maximumAge: 0})
                        console.log(result.state);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                    }
                };
            }) 
        } else {
            console.log("Location not available");
        }
    }

    useEffect(() => {
        getUserData();
        getUserLocation();
    }, []);

    return (
        screenLoad
        ?
        <PageLoader />
        :
        <Navigation />
    );
}

export default App;
