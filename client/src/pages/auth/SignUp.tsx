import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

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
                            <p
                                role="alert"
                                className="errorMessage"
                            >
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
                            <p
                                role="alert"
                                className="errorMessage"
                            >
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
                            <p
                                className="errorMessage"
                                role="alert"
                            >
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
            </div>
        </div>
    );
};
export default SignUp;
