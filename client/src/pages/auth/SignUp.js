import React from "react";
import SignupImage from "../../../public/images/Signup.png";
const SingUp = () => {
    return (
        <div className="signup__container">
            <div className="signup__container--left">
                <img src={SignupImage} alt="signupImage" />
            </div>
            <div className="signup__container--right"></div>
        </div>
    );
};
export default SingUp;
