// Import necessary modules from React
import React, { useState, useEffect } from "react";

const DartCounter = () => {
    // State to track the scores
    const [single, setSingle] = useState(0);
    const [double, setDouble] = useState(0);
    const [triple, setTriple] = useState(0);
    const [miss, setMiss] = useState(0);
    const [countdown, setCountdown] = useState(20);
    const [isCounting, setIsCounting] = useState(false);

    // Effect for handling the countdown timer
    useEffect(() => {
        if (isCounting && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (countdown === 0) {
            setIsCounting(false);
        }
    }, [isCounting, countdown]);

    // Reset all scores and timer
    const reset = () => {
        setSingle(0);
        setDouble(0);
        setTriple(0);
        setMiss(0);
        setCountdown(20);
        setIsCounting(false);
    };

    return (
        <div className="dart-counter">
            <h1>Dart Counter</h1>
            <div className="timer">Time Remaining: {countdown}s</div>

            <div className="buttons">
                <button onClick={() => setSingle(single + 1)}>Single</button>
                <button onClick={() => setDouble(double + 1)}>Double</button>
                <button onClick={() => setTriple(triple + 1)}>Triple</button>
                <button onClick={() => setMiss(miss + 1)}>Miss</button>
            </div>

            <div className="scores">
                <p>Single: {single}</p>
                <p>Double: {double}</p>
                <p>Triple: {triple}</p>
                <p>Miss: {miss}</p>
            </div>

            <div className="controls">
                <button onClick={() => setIsCounting(true)} disabled={isCounting || countdown === 0}>
                    Start
                </button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default DartCounter;
