import React from "react";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Carousel from "../components/carousal/Carousal";
import Footer from "../components/Footer/Footer";
import Testimonials from "../components/Testimonials/Testimonials";
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
                                    to={"/map"}
                                    className="home-page__hero--button--link"
                                >
                                    Explore
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <Carousel />
                <Testimonials />
            </div>
            <Footer />
        </>
    );
}

export default Home;
