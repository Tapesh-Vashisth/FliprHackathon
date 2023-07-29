import React, {useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify'
import { Routes, Route, useNavigation, useNavigate } from "react-router-dom";
import PageLoader from "./components/Loaders/PageLoader";
import Notification from "./components/notification/Notification";
import axiosInstance from "./api/axiosInstance";
import AuthProtected from "./components/AuthProtected";
import { useAppDispatch } from "./app/hooks";
import { userActions } from "./features/userSlice";
const Error404 = React.lazy(() => import("./pages/Error404"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Signup = React.lazy(() => import("./pages/auth/SignUp"));

function App() {
    const [screenLoad, setScreenLoad] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const getUserData = async () => {
      setScreenLoad(true);
      try {
        const response = await axiosInstance.get("/user/check");
        console.log(response);
        dispatch(userActions.setState(response.data));
        setScreenLoad(false);
      } catch (err: any) {
        console.log(err);
        setScreenLoad(false);
        toast.error('Login Again! User session Expired!',{
          position: 'top-right'
        })
      }
    }

    useEffect(() => {
      getUserData();
    }, []);

    return (
        screenLoad
        ?
        <PageLoader />
        :
        <>  
            <ToastContainer style={{ fontSize: '20px' }} />
            <Routes>
                <Route 
                  path="/loader" 
                  element={<PageLoader />} 
                />
                <Route
                  path="/auth"
                  element={<AuthProtected />}  
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
