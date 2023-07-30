import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from "../api/axiosInstance";



const Search_filter = (props: any) => {
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const [categories, setCategories] = useState(
        [
            {
                name: "Accommodation",
                value: "accommodation",
                selected: false
            },
            {
                name: "Tourism Attraction",
                value:"tourism.attraction",
                selected: false
            },
            {
                name: "Tourism Sights",
                value:"tourism.sights",
                selected: false
            },
            {
                name: "Temples",
                value:"religion.place_of_worship",
                selected: false
            },
            {
                name: "Shopping Mall",
                value:"commercial.shopping_mall",
                selected: false
            },
            {
                name: "Restaurant",
                value:"catering.restaurant",
                selected: false
            },
            {
                name: "Catering",
                value:"catering",
                selected: false
            },
            {
                name: "Entertainment",
                value:"entertainment",
                selected: false
            },
            {
                name: "Healthcare",
                value:"healthcare",
                selected: false
            },
            {
                name: "Parking",
                value:"parking",
                selected: false
            },
            {
                name: "Transport",
                value:"public_transport",
                selected: false
            },
        ]
    )

    const [showSearh, setShowSearch] = useState(false);
    const [locType, setLocType] = React.useState("city");
    const [loading, setLoading] = React.useState(false);


    const submitHandler = async (e: any) => {
        e.preventDefault();
        let searchCategories = categories.filter((x) => x.selected === true)
        console.log(searchCategories, city);

        try {
            const query = searchCategories.map((x) => x.value).join(",");
            console.log(query);
            const response = await axiosInstance.get(`/place/search?searchText=${city}&categories=${query}`)
            console.log(response);
            
            let markers: any = [];
            if (response.data.place.length > 0) {
                markers = [{name: response.data.place[0].name ? response.data.place[0].name: response.data.place[0].city, coordinates: [response.data.place[0].lat, response.data.place[0].lon], categories: [], place_id: response.data.place[0].place_id }];
            }
            markers = [...markers, ...response.data.details.map((x: any) => {
                return {name: x.properties.name ? x.properties.name : x.properties.formatted, coordinates: x.geometry.coordinates.reverse(), categories: x.properties.categories, place_id: x.properties.place_id }
            })]

            console.log(markers);
            props.setmarkers(markers);
        } catch (err: any) {
            console.log(err);
        }
    };

    const selectHandler = (index: number) => {
        console.log(categories);
        setCategories((prev) => {
            const holdCategories = [...prev];

            holdCategories[index].selected = !prev[index].selected;
            return holdCategories;
        }) 
    }


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
                    {
                        categories.map((category, index) => {
                            return (
                                <div
                                    key={index}
                                    className={categories[index].selected ? "search-filter__active" : "search-filter__inactive"}
                                    onClick={() => selectHandler(index)}
                                >
                                    <div className="search-filter__imageDiv">
                                        {/* <img alt="" src={Boarding} /> */}
                                    </div>
                                    <p>{category.name}</p>
                                </div>
                            )    
                        })   
                    }
                    </div>
                    {locType === "city" && (
                        <form className="search-filter__sizeSearch" onSubmit={submitHandler}>
                            <div className="search-filter__zipPicker">
                                <p>Service Location</p>
                                <input
                                    type="text"
                                    placeholder="City"
                                    style={{
                                        padding: "16.5px 0 16.5px 18px",
                                        width: "100%",
                                    }}
                                    onChange={(e: any) => {setCity(e.target.value)}}
                                    value = {city}
                                    required
                                />
                            </div>
                            <div className="search-filter__button">
                                <button>
                                    Search
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </>
        </div>
    );
};

export default Search_filter;
