import React, { useState, useEffect } from "react";
import Otp from "react-otp-input";
import axiosInstance from "../api/axiosInstance";
import Spinner from "react-bootstrap/Spinner";
let realTimer: number = 0;
function OtpInput(props: any) {
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(20);
    const [resendOtp, setResentOtp] = useState(false);
    useEffect(() => {
        const timerFunction = setInterval(() => {
            if (realTimer > 0) {
                setTimer((prevValue) => {
                    return prevValue - 1;
                });
            }
        }, 1000);

        return () => {
            clearInterval(timerFunction);
        };
    }, []);

    useEffect(() => {
        realTimer = timer;
        if (timer === 0) {
            setResentOtp(true);
        } else {
            setResentOtp(false);
        }
    }, [timer]);

    const ResendOtp = async (data: any) => {
        setTimer(20);
        try {
            const response = await axiosInstance.post("/user/sendotp", {
                email: props.userEmail,
            });
        } catch (err: any) {
            console.log(err);
        }
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        props.clickShowModalHandler(otp);
    };

    return (
        <div className="otp-input">
            <div className="otp-input__form">
                <form className="otp-input__form__mainform" onSubmit={onSubmit}>
                    <h1 className="otp-input__form__mainform__heading">
                        Verify OTP
                    </h1>
                    <p className="otp-input__form__mainform__smalltimer">
                        {timer >= 10 ? `00 : ${timer}` : `00:0${timer}`}
                    </p>
                    <p>

                    </p>
                    <div className="otp-input__form__mainform__otp">
                        <Otp
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    className="otp-input__form__mainform__otp__input"
                                />
                            )}
                        />
                    </div>

                    <div className="otp-input__form__mainform__button-container">
                        <div>
                            <button className="button-primary" type="submit">
                                Verify
                            </button>
                        </div>
                        {resendOtp && (
                            <button
                                className="button-primary"
                                onClick={ResendOtp}
                                type="button"
                            >
                                resend OTP
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OtpInput;
