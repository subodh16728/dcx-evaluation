import React, { useState, useEffect } from 'react';

const Dummy = () => {
    const [disable, setDisable] = useState(true);
    const [secondsRemaining, setSecondsRemaining] = useState(0);

    const handleOTP = () => {
        setDisable(!disable);
        setSecondsRemaining(10); // Set the initial number of seconds
    };

    useEffect(() => {
        let intervalId;

        if (!disable && secondsRemaining > 0) {
            intervalId = setInterval(() => {
                setSecondsRemaining(prevSecondsRemaining => prevSecondsRemaining - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);

    }, [disable, secondsRemaining]);

    useEffect(() => {
        if (secondsRemaining === 0) {
            setDisable(true);
        }
    }, [secondsRemaining]);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className={`btn btn-primary ms-2 ${disable ? "" : "disabled"}`} type="button" onClick={handleOTP}>Resend OTP</button>
            {!disable && <p style={{ marginLeft: '10px' }}>{`Resend OTP: ${secondsRemaining}s`}</p>}
        </div>
    );
};

export default Dummy;
