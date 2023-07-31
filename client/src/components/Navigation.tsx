import React, { useEffect } from "react";
import { Routes, Route, useNavigation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Protected from "../components/Protected";
import AuthProtected from "../components/AuthProtected";
import PageLoader from "./Loaders/PageLoader";
import { useAppSelector } from "../app/hooks";
import MyMap from "./Map/my-map";
import NewMap from './NewMap';
const Error404 = React.lazy(() => import("../pages/Error404"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const Signup = React.lazy(() => import("../pages/auth/SignUp"));
const Home = React.lazy(() => import("../pages/Home"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));


function Navigation() {
    return (
        <>
            <ToastContainer style={{ fontSize: "20px" }} />
            <Routes>
                <Route path="/loader" element={<PageLoader />} />
                <Route path="/auth" element={<AuthProtected />}>
                    <Route
                        path="login"
                        element={
                            <React.Suspense fallback={<PageLoader />}>
                                <Login />
                            </React.Suspense>
                        }
                    />

                    <Route
                        path="signup"
                        element={
                            <React.Suspense fallback={<PageLoader />}>
                                <Signup />
                            </React.Suspense>
                        }
                    />
                </Route>

                <Route path="/">
                    <Route path="" element={<Home />} />
                    <Route path="map" element={<MyMap />} />   
                    <Route path="map/favourite" element={<NewMap />} />   
                    <Route path="map/itn" element={<NewMap />} />   
                </Route>

                <Route path="/" element={<Protected />}>
                    <Route
                        path="dashboard"
                    >
                        <Route
                            path=""
                            element={
                                <React.Suspense fallback={<PageLoader />}>
                                    <Dashboard type = "profile" />
                                </React.Suspense>
                            }
                        />

                        <Route
                            path="itinerary"
                            element={
                                <React.Suspense fallback={<PageLoader />}>
                                    <Dashboard type = "itinerary" />
                                </React.Suspense>
                            }
                        />

                        <Route
                            path="favorites"
                            element={
                                <React.Suspense fallback={<PageLoader />}>
                                    <Dashboard type = "favorites" />
                                </React.Suspense>
                            }
                        />
                    </Route>
                </Route>

                <Route
                    path="*"
                    element={
                        <React.Suspense fallback={<PageLoader />}>
                            <Error404 />
                        </React.Suspense>
                    }
                />
            </Routes>
        </>
    );
}

export default Navigation;
