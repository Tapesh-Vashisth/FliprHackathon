import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import axiosInstance from "../../api/axiosInstance";
import OtpInput from "../../components/OtpInput";


const SignUp = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const clickShowModalHandler = () => {
        setShowModal(false);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm();

    const dispatch = useAppDispatch();

    const onSubmit = async (data: any) => {
        setLoading(true);
        try { 
            const response = await axiosInstance.post("/user/sendotp", {email: data.email});
            if (response.status === 200) {
                setShowModal(true);
            }
            setLoading(false);
        } catch (err: any) {
            console.log(err);
            setLoading(false);
        }
    };


    const onFinalSubmit = async (otp: string) => {
        setShowModal(false);
        setLoading(true);
        try {
            const res = await axiosInstance.post("/user/signup", {name: watch("name"), email: watch("email"), password: watch("password"), otp: otp})
            console.log(res);
            setLoading(false);
        } catch (err: any) {
            console.log(err);
            setLoading(false);
        } 
    }

    const arrow = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.2rem"
            viewBox="0 0 448 512"
        >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
    );
    return (
        <div className="page-signup">
            <div className="page-signup__form">
                <form
                    className="page-signup__form--mainform"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="page-signup__form--heading">SignUp</h1>
                    <div className="page-signup__form--input_group">
                        <label className="page-signup__form--input_group--label">
                            Name*
                        </label>
                        <input
                            className="page-signup__form--input_group--input"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                        {errors.name && (
                            <p role="alert" className="errorMessage">
                                {errors.name?.message?.toString()}
                            </p>
                        )}
                    </div>
                    <div className="page-signup__form--input_group">
                        <label className="page-signup__form--input_group--label">
                            Email*
                        </label>
                        <input
                            className="page-signup__form--input_group--input"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter valid Email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p role="alert" className="errorMessage">
                                {errors.email?.message?.toString()}
                            </p>
                        )}
                    </div>
                    <div className="page-signup__form--input_group">
                        <label className="page-signup__form--input_group--label">
                            Password*
                        </label>
                        <input
                            className="page-signup__form--input_group--input"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^.{8,}$/,
                                    message:
                                        "Password must be atleast 8 characters long",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="errorMessage" role="alert">
                                {errors.password?.message?.toString()}
                            </p>
                        )}
                    </div>
                    <div className="page-signup__form--button-container">
                        <button className="button-primary" type="submit">
                            SignMe Up
                        </button>
                    </div>
                </form>
                <div className="page-signup__alreadyExists">
                    <span>Account Already Exists</span>
                    {arrow}
                    <Link
                        to={"/auth/login"}
                        className="page-signup__alreadyExists--link"
                    >
                        LoginHere
                    </Link>
                </div>
            </div>
            {showModal && (
                <OtpInput 
                    clickShowModalHandler = {(otp: string) => {
                        onFinalSubmit(otp);
                        setShowModal(false);
                    }} 
                />
            )}
        </div>
    );
};
export default SignUp;