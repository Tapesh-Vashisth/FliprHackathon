import React from "react";

const Testimonials = () => {
    return (
        <div className="testimonials">
            <div className="testimonials-title">
                <h1>What Our Happy</h1>
                <h1>Clients Say</h1>
            </div>
            <div className="testimonials-review">
                <div className="testimonials-review-1">
                    <div className="testimonials-reviewcard">
                        <div className="testimonials-div">
                            <img
                                alt="dog1"
                                src="https://c4.wallpaperflare.com/wallpaper/71/196/981/digital-art-minimalism-nature-hills-wallpaper-preview.jpg"
                                className="testimonials-div-img"
                            />
                        </div>
                        <div>
                            <p>
                                "Unparalleled adventures, memories etched in my
                                heart forever."
                            </p>
                        </div>
                        <p>Tapesh,Karachi</p>
                    </div>
                </div>
                <div className="testimonials-review-2">
                    <div className="testimonials-reviewcard2">
                        <div className="testimonials-div">
                            <img
                                alt="dog2"
                                src="https://c4.wallpaperflare.com/wallpaper/203/697/217/fkyhdino-landscape-artwork-mountains-wallpaper-preview.jpg"
                                className="testimonials-div-img"
                            />
                        </div>
                        <div>
                            <p>
                                "Incredible guides, I discovered the world like
                                never before."
                            </p>
                        </div>
                        <p>Prasad,Banglore</p>
                    </div>
                </div>
                <div className="testimonials-review-3">
                    <div className="testimonials-reviewcard3">
                        <div className="testimonials-div">
                            <img
                                alt="dog3"
                                src="https://c4.wallpaperflare.com/wallpaper/664/373/122/forest-mikael-gustafsson-landscape-horizon-wallpaper-preview.jpg"
                                className="testimonials-div-img"
                            />
                        </div>
                        <div>
                            <p>
                                "Heartfelt thanks, this trip enriched my soul
                                beyond words."
                            </p>
                        </div>
                        <p>Pranauv,Chennai</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
