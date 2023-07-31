import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import SocialSharing from "../components/SocialSharing";

function Itinarary() {
    const [modal, showModal] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [itanaries, setItanaries] = useState([]);
    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleCreateItinarary = () => {
        showModal(true);
    };

    const handleDiscardItinarary = () => {
        showModal(false);
    };

    const handleSubmitItinarary = async (e: any) => {
        e.preventDefault();
        setCreating(true);
        try {
            const response = await axiosInstance.post("itinarary/create", {
                iName: name,
                description: desc,
            });
            getMyItinararies();
            toast.success("Created Successfully!");
            showModal(false);
            setCreating(false);
        } catch (err: any) {
            console.log(err);
            toast.error(err.response.data.message, { position: "top-right" });
            setCreating(false);
        }
    };

    const getMyItinararies = async () => {
        try {
            const response = await axiosInstance.get("itinarary/myitinararies");
            setItanaries(response.data);
            showModal(false);
            setLoading(false);
        } catch (err: any) {
            console.log(err);
            setLoading(false);
            toast.error(err.response.data.message, { position: "top-right" });
        }
    };

    useEffect(() => {
        setLoading(true);
        getMyItinararies();
    }, []);

    return (
        <div className="itinarary__favourites">
            {!modal && (
                <div className="itinarary__favourites--details">
                    <div className="itinarary__favourites--heading">
                        <h1>Itinararies</h1>
                    </div>
                    <div className="itinarary__favourites--create">
                        <button onClick={handleCreateItinarary}>
                            Create Itenarary
                        </button>
                    </div>
                    {loading ? (
                        <div style={{ textAlign: "center" }}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <div
                            className="itinarary__favourites--itinarary--list"
                            style={{ paddingBottom: "30px" }}
                        >
                            {itanaries.map((x: any, index) => {
                                return (
                                    <div className="itinarary__favourites--itinarary--list--itenarary">
                                        <div className="itinarary__favourites--itinarary--list--itenarary-left">
                                            <div className="itinarary__favourites--itinarary--list--itenarary-left-1">
                                                <p>Itinarary : {x._doc.name}</p>
                                            </div>
                                            <div className="itinarary__favourites--itinarary--list--itenarary-left-2">
                                                <p>
                                                    Desc : {x._doc.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="itinarary__favourites--itinarary--list--itenarary-right">
                                            {x.placesInfo.length > 0 ? (
                                                <Link
                                                    to={`/map/itn?lat=${
                                                        x.placesInfo[0].lat
                                                    }&lon=${
                                                        x.placesInfo[0].lon
                                                    }&place_id=${
                                                        x.placesInfo[0].place_id
                                                    }&places=${JSON.stringify(
                                                        x.placesInfo
                                                    )}`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <p>
                                                        {x.placesInfo.map(
                                                            (
                                                                place: any,
                                                                index: any
                                                            ) => {
                                                                return (
                                                                    (place.name ||
                                                                        place.city) +
                                                                    (index !==
                                                                    x.placesInfo
                                                                        .length -
                                                                        1
                                                                        ? ", "
                                                                        : "")
                                                                );
                                                            }
                                                        )}
                                                    </p>
                                                </Link>
                                            ) : (
                                                "Please add places to the itinarary"
                                            )}
                                        </div>
                                        {x.placesInfo.length > 0 ? (
                                            <SocialSharing
                                                url={
                                                    "https://golden-zabaione-725504.netlify.app" +
                                                    `/map/itn?lat=${
                                                        x.placesInfo[0].lat
                                                    }&lon=${
                                                        x.placesInfo[0].lon
                                                    }&place_id=${
                                                        x.placesInfo[0].place_id
                                                    }&places=${JSON.stringify(
                                                        x.placesInfo
                                                    )}`
                                                }
                                                type="itinarary"
                                            />
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
            {modal && (
                <div className="create-itinarary">
                    <div className="create-itinarary__form">
                        <form
                            className="create-itinarary__form__mainform"
                            onSubmit={handleSubmitItinarary}
                        >
                            <h1>Create Itinarary</h1>
                            <div className="create-itinarary__form__mainform--inputGroup">
                                <label>Name Of Itinarary</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e: any) =>
                                        setName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="create-itinarary__form__mainform--inputGroup">
                                <label>Description Of Itinarary</label>
                                <input
                                    type="text"
                                    value={desc}
                                    onChange={(e: any) =>
                                        setDesc(e.target.value)
                                    }
                                />
                            </div>
                            <div className="create-itinarary__form__mainform--buttonGroup">
                                <button>
                                    {creating ? (
                                        <CircularProgress size={"1.5rem"} />
                                    ) : (
                                        "Create"
                                    )}
                                </button>
                                <button
                                    onClick={handleDiscardItinarary}
                                    type="button"
                                >
                                    Discard
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Itinarary;
