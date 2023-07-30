import React, {useEffect, useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from "../api/axiosInstance";
import config from '../helper/config';
import CircularProgress from "@mui/material/CircularProgress"
import weatherApi from '../api/weatherApi';

function PlaceSidebar(props: any) {
    const [image, setImage] = useState("");
    const [imageLoading, setImageLoading] = useState(true);

    const getPlaceImage = async () => {
        setImageLoading(true);
        console.log(props.data);
        try {
            const data = await fetch(
                `https://api.unsplash.com/search/photos?page=1?limit=1&query=${props.data.place_name}&client_id=${config.UNSPLASH_ACCESS}`
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
    }

    useEffect(() => {
        getPlaceImage();
        getWeatherData();
    }, []);


    return (
        <div style = {{position: "absolute", zIndex: 1001, top: 0, right: 0, height: "100vh", width: "40vw", overflowY: "scroll", background: "lightgreen", display: "flex"}}>
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
                            <div style = {{position: "relative", padding: "0px 1rem"}}>
                                {
                                    image
                                    ?
                                    <img src = {image} style = {{width: "100%"}} alt='No image found' />
                                    :
                                    <img src = {require("../images/Image_not_available.png")} style = {{width: "100%"}} alt='No image found' />
                                }
                            </div>
                        </div>
                    }
                </div>
        </div>
    )
}

export default PlaceSidebar