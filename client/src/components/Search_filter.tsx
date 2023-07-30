import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Search_filter = () => {
    const navigate = useNavigate();
    const [showSearh, setShowSearch] = useState(false);
    const [selectedCat, setSelectedCat] = React.useState(false);
    const [selectedDog, setSelectedDog] = React.useState(true);
    const [selectOther, setSelectOther] = React.useState(false);
    const [locType, setLocType] = React.useState("city");
    const [loading, setLoading] = React.useState(false);
    const [latitude, setLatitude] = React.useState("");
    const [longitude, setLongitude] = React.useState("");
    const [activeBoarding, setActiveBoarding] = React.useState(true);
    const [activeHouseSitting, setActiveHouseSitting] = React.useState(false);
    const [activeDropIn, setActiveDropIn] = React.useState(false);
    const [activeDayCare, setActiveDayCare] = React.useState(false);
    const [activeWalking, setActiveWalking] = React.useState(false);
    const [activeBreeding, setActiveBreeding] = React.useState(false);
    const [activeAdopt, setActiveAdopt] = React.useState(false);
    const [serviceType, setServiceType] = React.useState("boarding");
    const [location, setLocation] = React.useState("");

    const locationHandler = (event: any) => {
        setLocation(event.target.value);
    };

    const dogClickHandler = () => {
        setSelectedDog(true);
        setSelectOther(false);
        setSelectedCat(false);
    };
    const catClickHandler = () => {
        setSelectedCat(true);
        setSelectOther(false);
        setSelectedDog(false);
    };

    const adoptionClickHandler = (event: any) => {
        setActiveBoarding(false);
        setActiveDayCare(false);
        setActiveDropIn(false);
        setActiveHouseSitting(false);
        setActiveWalking(false);
        setActiveBreeding(false);
        setActiveAdopt(true);
        setServiceType("petAdoption");
    };

    const groomingClickHandler = (event: any) => {
        setActiveAdopt(false);
        setActiveBoarding(true);
        setActiveDayCare(false);
        setActiveDropIn(false);
        setActiveHouseSitting(false);
        setActiveWalking(false);
        setActiveBreeding(false);
        setServiceType("petGrooming");
    };

    const trainingClickHandler = () => {
        setActiveAdopt(false);
        setActiveHouseSitting(true);
        setActiveBoarding(false);
        setActiveDayCare(false);
        setActiveDropIn(false);
        setActiveWalking(false);
        setActiveBreeding(false);
        setServiceType("petTraining");
    };

    const walkingClickHandler = () => {
        setActiveAdopt(false);
        setActiveDropIn(true);
        setActiveHouseSitting(false);
        setActiveBoarding(false);
        setActiveDayCare(false);
        setActiveWalking(false);
        setActiveBreeding(false);
        setServiceType("petWalking");
    };

    const vetClickHandler = () => {
        setActiveAdopt(false);
        setActiveDayCare(true);
        setActiveDropIn(false);
        setActiveHouseSitting(false);
        setActiveBoarding(false);
        setActiveWalking(false);
        setActiveBreeding(false);
        setServiceType("petVet");
    };

    const daycareClickHandler = () => {
        setActiveAdopt(false);
        setActiveWalking(true);
        setActiveDayCare(false);
        setActiveDropIn(false);
        setActiveHouseSitting(false);
        setActiveBoarding(false);
        setActiveBreeding(false);
        setServiceType("petCare");
    };

    const breedingClickHandler = () => {
        setActiveAdopt(false);
        setActiveWalking(false);
        setActiveDayCare(false);
        setActiveDropIn(false);
        setActiveHouseSitting(false);
        setActiveBoarding(false);
        setActiveBreeding(true);
        setServiceType("petBreeding");
    };

    const otherClickHandler = () => {
        setSelectOther(true);
        setSelectedDog(false);
        setSelectedCat(false);
    };

    const currLocClickHandler = () => {
        // const options = {
        //     enableHighAccuracy: true,
        //     timeout: 5000,
        //     maximumAge: 0,
        // };
        // const sucess = (pos) => {
        //     console.log(pos.coords.longitude);
        //     console.log(pos.coords.latitude);
        //     setLocType("geolocation");
        //     setLatitude(pos.coords.latitude);
        //     setLongitude(pos.coords.longitude);
        // };
        // const error = (err) => {
        //     setLocType("city");
        //     console.log(err);
        // };
        // navigator.geolocation.getCurrentPosition(sucess, error, options);
    };
    const cityClickHandler = () => {
        setLocType("city");
    };
    let activeGroomingStyles = activeBoarding ? "search-filter__active": "search-filter__Boarding"
    let activeTrainingStyles = activeHouseSitting
        ? "search-filter__active"
        : "search-filter__HouseSitting"
    let activeVetStyles = activeDayCare ? "search-filter__active" : "search-filter__DogDayCare";
    let activeDaycareStyles = activeWalking ? "search-filter__active" : "search-filter__DogWalking";
    let activeWalkingStyles = activeDropIn
        ? "search-filter__active"
        : "search-filter__DropInVisits"
    let activeBreedingStyles = activeBreeding ? "search-filter__active" : "search-filter__breeding";

    const submitHandler = () => {
        // if (!authCtx.isLoggedIn) {
        //     navigate("/login");
        // }
        let petType = "";
        if (selectedCat) {
            petType = "cat";
        }
        if (selectOther) {
            petType = "other";
        }
        if (selectedDog) {
            petType = "dog";
        }
        console.log(serviceType, location, petType);
        // let lowerLocation = location.toLowerCase();
        setLoading(true);
        if (locType === "city") {
            fetch(
                `https://friskei-backend.onrender.com/search/${serviceType}/${petType}/${location}`,
                {
                    method: "get",
                }
            ).then((response) => {
                response.json().then((data) => {
                    navigate("/search", { state: data });
                });
            });
        }
        if (locType === "geolocation") {
            fetch(
                `https://friskei-backend.onrender.com/search/${serviceType}/${petType}/${location}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude,
                        radius: 5,
                    }),
                }
            ).then((response) => {
                response.json().then((data) => {
                    navigate("/search", { state: data });
                });
            });
        }
    };
    return (
        !showSearh
        ?
        <SearchIcon style={{fontSize: "45px", position: "absolute", top: "10px", right: "10px", zIndex: 1000}} onClick = {() => setShowSearch(true)} />
        :
        <div className="search-filter">
            <>
                <div className="search-filter__upper">
                    <h1>Search</h1>
                    <CloseIcon style = {{fontSize: "20px"}} onClick = {() => setShowSearch(false)} />
                </div>
                <div className="search-filter__lower">
                    <div className="search-filter__options">
                        <div
                            className={activeGroomingStyles}
                            onClick={groomingClickHandler}
                        >
                            <div className="search-filter__imageDiv">
                                {/* <img alt="" src={Boarding} /> */}
                            </div>
                            <p>Grooming</p>
                        </div>
                        <div
                            className={activeTrainingStyles}
                            onClick={trainingClickHandler}
                        >
                            <div className="search-filter__imageDiv">
                                {/* <img alt="" src={HouseSitting} /> */}
                            </div>
                            <p>Training</p>
                        </div>
                        <div
                            className={activeWalkingStyles}
                            onClick={walkingClickHandler}
                        >
                            <div className="search-filter__imageDiv">
                                {/* <img alt="" src={DropInVisits} /> */}
                            </div>
                            <p>Walking</p>
                        </div>
                        <div
                            className={activeVetStyles}
                            onClick={vetClickHandler}
                        >
                            <div className="search-filter__imageDiv">
                                {/* <img alt="" src={DogDayCare} /> */}
                            </div>
                            <p>Vet</p>
                        </div>
                        <div
                            className={activeDaycareStyles}
                            onClick={daycareClickHandler}
                        >
                            <div className="search-filter__imageDiv">
                                {/* <img alt="" src={DogWalking} /> */}
                            </div>
                            <p>DayCare</p>
                        </div>
                        <div
                            className={activeBreedingStyles}
                            onClick={breedingClickHandler}
                        >
                            <div className="search-filter__imageDiv">
                                {/* <img alt="" src={Heart} /> */}
                            </div>
                            <p>Breeding</p>
                        </div>
                        {/* <div
                            className={activePetAdoptStyles}
                            onClick={adoptionClickHandler}
                        >
                            <div className={styles.imageDiv}>
                                <img alt="" src={Adopt} />
                            </div>
                            <p>Pet Adoption</p>
                        </div> */}
                    </div>
                    {locType === "city" && (
                        <div className="search-filter__sizeSearch">
                            <div className="search-filter__zipPicker">
                                <p>Service Location</p>
                                <input
                                    type="text"
                                    placeholder="City"
                                    style={{
                                        padding: "16.5px 0 16.5px 18px",
                                        width: "100%",
                                    }}
                                    onChange={locationHandler}
                                />
                            </div>
                            <div className="search-filter__button">
                                <button onClick={submitHandler}>
                                    Search
                                </button>
                            </div>
                        </div>
                    )}
                    {locType === "geolocation" && (
                        <div className="search-filter__sizeSearch">
                            <div
                                className="search-filter__button"
                                style={{ margin: "0 auto" }}
                            >
                                <button onClick={submitHandler}>
                                    Search
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </>
        </div>
    );
};

export default Search_filter;
