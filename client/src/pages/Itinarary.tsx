import React, { useState } from "react";

function Itinarary() {
    const [modal, showModal] = useState(false);
    const handleCreateItinarary = () => {
        showModal(true);
    };
    const handleDiscardItinarary = () => {
        showModal(false);
    };
    const handleSubmitItinarary = () => {
      
    };
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
                    <div className="itinarary__favourites--itinarary--list">
                        <div className="itinarary__favourites--itinarary--list--itenarary">
                            <div className="itinarary__favourites--itinarary--list--itenarary-left">
                                <div className="itinarary__favourites--itinarary--list--itenarary-left-1">
                                    <p>DateOfThis</p>
                                </div>
                                <div className="itinarary__favourites--itinarary--list--itenarary-left-2">
                                    <p>description of itenerary</p>
                                </div>
                            </div>
                            <div className="itinarary__favourites--itinarary--list--itenarary-right">
                                <p>List of places to for this day</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {modal && (
                <div className="create-itinarary">
                    <div className="create-itinarary__form">
                        <form className="create-itinarary__form__mainform">
                            <h1>Create Itinarary</h1>
                            <div className="create-itinarary__form__mainform--inputGroup">
                                <label>Name Of Itinarary</label>
                                <input />
                            </div>
                            <div className="create-itinarary__form__mainform--inputGroup">
                                <label>Description Of Itinarary</label>
                                <input />
                            </div>
                            <div className="create-itinarary__form__mainform--buttonGroup">
                                <button>Create</button>
                                <button onClick={handleDiscardItinarary}>
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
