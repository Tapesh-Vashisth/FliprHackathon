import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            const response = await axiosInstance.post("/user/login", {});
        } catch (err: any) {
            console.log(err);
        }
    };

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
        <div className="page-login">
            <div className="page-login__form">
                <form
                    className="page-login__form--mainform"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="page-login__form--heading">Welcom Back</h1>
                    <div className="page-login__form--input_group">
                        <label className="page-login__form--input_group--label">
                            Email*
                        </label>
                        <input
                            className="page-login__form--input_group--input"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter valid Email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="errorMessage" role="alert">
                                {errors.email?.message?.toString()}
                            </p>
                        )}
                    </div>
                    <div className="page-login__form--input_group">
                        <label className="page-login__form--input_group--label">
                            Password*
                        </label>
                        <input
                            className="page-login__form--input_group--input"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && (
                            <p role="alert" className="errorMessage">
                                {errors.password?.message?.toString()}
                            </p>
                        )}
                    </div>
                    <div className="page-signup__form--button-container">
                        <button className="button-primary" type="submit">
                            LogMe In
                        </button>
                    </div>
                    <div className="page-login__dontExists">
                        <span>Don't Have an Account</span>
                        {arrow}
                        <Link
                            to={"/auth/signup"}
                            className="page-login__dontExists--link"
                        >
                            JoinUs Here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
