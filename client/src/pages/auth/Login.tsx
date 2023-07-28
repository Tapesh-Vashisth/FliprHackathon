import React from "react";

const Login = () => {
    return (
        <div className="page-login">
            <div className="page-login__form">
                <form className="page-login__form--mainform">
                    <h1 className="page-login__form--heading">Welcom Back</h1>
                    <div className="page-login__form--input_group">
                        <label className="page-login__form--input_group--label">
                            Email*
                        </label>
                        <input
                            className="page-login__form--input_group--input"
                            type="email"
                        />
                    </div>
                    <div className="page-login__form--input_group">
                        <label className="page-login__form--input_group--label">
                            Password*
                        </label>
                        <input
                            className="page-login__form--input_group--input"
                            type="password"
                        />
                    </div>
                    <div className="page-signup__form--button-container">
                        <button className="button-primary">LogMe In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
