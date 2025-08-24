import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ baseurl,onVehicleEntry}) => {
    const [numberplate, setNumberplate] = useState("");
    const [message, setMessage] = useState("");
    const [exittime, setExitTime] = useState(null);

    const handleCheckout = async () => {
        if (!numberplate.trim()) {
            setMessage("Please enter a number plate.");
            setExitTime(null);
            return;
        }

        try {
            const res = await axios.post(`${baseurl}/exit`, {
                numberplate: numberplate.trim()
            });

            setExitTime(res.data.exitTime || null);
            setMessage(res.data.message || "Checked out successfully.");
            if(onVehicleEntry){
                onVehicleEntry();
            }
        } catch (err) {
            setMessage("Checkout failed: " + (err.response?.data?.message || "Server error"));
            setExitTime(null);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "20px auto" }}>
            <h2>Check Out Vehicle</h2>

            <label htmlFor="numberplate">Number Plate:</label>
            <input
                id="numberplate"
                type="text"
                placeholder="Enter vehicle number"
                value={numberplate}
                onChange={(e) => setNumberplate(e.target.value.toUpperCase())}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            <button
                onClick={handleCheckout}
                className="action-btn"
                style={{ padding: "10px 15px", marginTop: "10px" }}
            >
                Check Out Vehicle
            </button>

            {exittime && (
                <p style={{ marginTop: "10px" }}>
                    Exit Time Recorded: <strong>{new Date(exittime).toLocaleString()}</strong>
                </p>
            )}
            {message && <p style={{ color: message.includes("failed") ? "red" : "green" }}>{message}</p>}
        </div>
    );
};

export default Checkout;