import React from "react";
import {useForm} from "react-hook-form";


const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <div className="page-login">
            <div className="page-login__form">
                <form className="page-login__form--mainform" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="page-login__form--heading">Welcom Back</h1>
                    <div className="page-login__form--input_group">
                        <label className="page-login__form--input_group--label">
                            Email*
                        </label>
                        <input
                            className="page-login__form--input_group--input"
                            type="email"
                            {...register("email", {required: "Email is required", pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter valid Email"}})}
                        />
                        {
                            errors.email && <p role="alert">{errors.email?.message?.toString()}</p>
                        }
                    </div>
                    <div className="page-login__form--input_group">
                        <label className="page-login__form--input_group--label">
                            Password*
                        </label>
                        <input
                            className="page-login__form--input_group--input"
                            type="password"
                            {...register("password", {required: "Password is required"})}
                        />
                        {
                            errors.password && <p role="alert">{errors.password?.message?.toString()}</p>
                        }
                    </div>
                    <div className="page-signup__form--button-container">
                        <button className="button-primary" type = "submit">LogMe In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
