import React from "react";
const SignUp = () => {
    return (
        <div className="page-signup">
            <div className="page-signup__form">
                <form className="page-signup__form--mainform">
                    <h1 className="page-signup__form--heading">SignUp</h1>
                    <div className="page-signup__form--input_group">
                        <label className="page-signup__form--input_group--label">
                            Name*
                        </label>
                        <input className="page-signup__form--input_group--input" />
                    </div>
                    <div className="page-signup__form--input_group">
                        <label className="page-signup__form--input_group--label">
                            Email*
                        </label>
                        <input className="page-signup__form--input_group--input" />
                    </div>
                    <div className="page-signup__form--input_group">
                        <label className="page-signup__form--input_group--label">
                            Password*
                        </label>
                        <input
                            className="page-signup__form--input_group--input"
                            type="password"
                        />
                    </div>
                    <div className="page-signup__form--button-container">
                        <button className="button-primary">SignMe Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUp;
