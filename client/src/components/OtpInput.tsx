import React, { useState } from 'react'
import Otp from "react-otp-input";

function OtpInput(clickShowModalHandler: any) {
    const [otp, setOtp] = useState("");
    
    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(otp);


    }

    return (
        <div
            className="otp-input"
        >
            <div className="otp-input__form">
                <form className="otp-input__form__mainform" onSubmit = {onSubmit}>
                    <h1 className="otp-input__form__mainform__heading">
                        Verify OTP
                    </h1>
                    <p className="otp-input__form__mainform__smalltimer">
                        12:00
                    </p>

                    <div className='otp-input__form__mainform__otp'>
                        <Otp
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => <input {...props} className='otp-input__form__mainform__otp__input' />}
                        />
                    </div>


                    <div className="otp-input__form__mainform__button-container">
                        <button
                            className="button-primary"
                            type='submit'
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OtpInput