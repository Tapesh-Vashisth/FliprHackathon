import React, {useEffect, useState} from "react";
import PageLoader from "./components/Loaders/PageLoader";
import axiosInstance from "./api/axiosInstance";
import { useAppDispatch } from "./app/hooks";
import { userActions } from "./features/userSlice";
import Navigation from "./components/Navigation";


function App() {
    const [screenLoad, setScreenLoad] = useState(false);
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
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return screenLoad ? (
        <PageLoader />
    ) : (
        <Navigation />
    );
}

export default App;
