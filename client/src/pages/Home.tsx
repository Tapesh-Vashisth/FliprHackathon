import React from "react";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
function Home() {
    const user = useAppSelector((state) => state.user);
    return (
        <>
            <Header />
            <div className="home-page">
                <div className="home-page__hero">
                    <div className="home-page__hero--content">
                        <h1 className="home-page__hero--heading">
                            Plan Your Destinations
                        </h1>
                        <h1 className="home-page__hero--heading">
                            Before You Travel
                        </h1>
                        <div className="home-page__hero--button">
                            {!user.isLoggedIn && (
                                <Link
                                    to={"/auth/signup"}
                                    className="home-page__hero--button--link"
                                >
                                    JoinUs Here
                                </Link>
                            )}
                            {user.isLoggedIn && (
                                <Link
                                    to={"/dashboard"}
                                    className="home-page__hero--button--link"
                                >
                                    View Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
