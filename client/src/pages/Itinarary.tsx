import React from "react";

function Itinarary() {
    return (
        <div className="itinarary__favourites">
            <div className="itinarary__favourites--details">
                <div className="itinarary__favourites--heading">
                    <h1>Itinararies</h1>
                </div>
                <div className="itinarary__favourites--create">
                    <button>Create Itenarary</button>
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
        </div>
    );
}

export default Itinarary;
