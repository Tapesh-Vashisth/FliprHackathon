import React from "react";

function Error404() {
    return (
        <div className="body bg-purple error-404">
            <div className="stars space">
                <div className="central-body space__central-body">
                    <img
                        className="image-404"
                        src="http://salehriaz.com/404Page/img/404.svg"
                        width="300px"
                        alt=""
                    />
                    <a
                        href="http://salehriaz.com/404Page/404.html"
                        className="btn-go-home"
                        target="/"
                    >
                        GO BACK HOME
                    </a>
                </div>
                <div className="space__objects">
                    <img
                        className="space__objects--rocket"
                        src="http://salehriaz.com/404Page/img/rocket.svg"
                        width="40px"
                        alt=""
                    />
                    <div className="space__objects--earth-moon">
                        <img
                            className="object_earth space__objects--earth"
                            src="http://salehriaz.com/404Page/img/earth.svg"
                            width="100px"
                            alt=""
                        />
                        <img
                            className="space__objects--moon"
                            src="http://salehriaz.com/404Page/img/moon.svg"
                            width="80px"
                            alt=""
                        />
                    </div>
                    <div className="space__objects--box-astronaut">
                        <img
                            className="object_astronaut space__objects--astranaut"
                            src="http://salehriaz.com/404Page/img/astronaut.svg"
                            width="140px"
                            alt=""
                        />
                    </div>
                </div>
                <div className="space__glowing-stars">
                    <div className="space__glowing-stars--star"></div>
                    <div className="space__glowing-stars--star"></div>
                    <div className="space__glowing-stars--star"></div>
                    <div className="space__glowing-stars--star"></div>
                    <div className="space__glowing-stars--star"></div>
                </div>
            </div>
        </div>
    );
}

export default Error404;
