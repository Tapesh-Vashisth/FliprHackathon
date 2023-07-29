import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import PageLoader from "./Loaders/PageLoader";
import { toast } from "react-toastify";

function AuthProtected() {
    const location = useLocation();
    const user = useAppSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        if (user.isLoggedIn) {          
            toast.warning("Already logged In!", {position: "top-right"})
            navigate("/", {replace: true});
        }

        setLoading(false);
    }, []);

    return loading ? <PageLoader /> : <Outlet />;
}

export default AuthProtected;
