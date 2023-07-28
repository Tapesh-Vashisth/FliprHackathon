import React from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./components/Loaders/PageLoader";
const Error404 = React.lazy(() => import("./pages/Error404"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Signup = React.lazy(() => import("./pages/auth/SignUp"));


function App() {
    return (
        <>
            <Routes>
                <Route 
                  path="/loader" 
                  element={<PageLoader />} 
                />

                <Route
                  path="/auth"  
                >

                  <Route
                    path="login"
                    element={
                      <React.Suspense
                        fallback = {<PageLoader />}
                      >
                        <Login />
                      </React.Suspense>
                    }
                  />

                  <Route
                    path="signup"
                    element={
                      <React.Suspense
                        fallback = {<PageLoader />}
                      >
                        <Signup />
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
    );
}

export default App;
