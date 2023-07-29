import React from 'react'
import { Routes, Route, useNavigation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import Protected from "../components/Protected";
import Account from "../pages/auth/Account";
import AuthProtected from "../components/AuthProtected";
import PageLoader from './Loaders/PageLoader';
const Error404 = React.lazy(() => import("../pages/Error404"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const Signup = React.lazy(() => import("../pages/auth/SignUp"));
const Home = React.lazy(() => import('../pages/Home'));

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

            
            <Route path = "/">
                <Route path = "" element = {<Home />} />
            </Route>

            <Route path="/" element={<Protected />}>
                <Route
                    path="profile"
                    element={
                        <React.Suspense fallback={<PageLoader />}>
                            <Account />
                        </React.Suspense>
                    }
                />
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
  )
}

export default Navigation