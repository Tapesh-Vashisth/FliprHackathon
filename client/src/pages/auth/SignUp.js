import React from "react";
const SignUp = () => {
    return (
        <div className="signup page-signup">
            <div className="page-signup__form">
                <form className="page-signup__form--mainform">
                    <h1 className="page-signup__form--heading">SignUp</h1>
                    <div className="page-signup__form--input_group">
                        <label className="page-signup__form--input_group--label">
                            Name
                        </label>
                        <input className="page-signup__form--input_group--input" />
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUp;
