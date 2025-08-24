import { useState } from "react";
import axios from "axios";
import VehicleSearch from "./VehicleSearch";

const baseurl = `${import.meta.env.VITE_REACT_APP_BASEURL}/api`;
const enterVehicle = (data) => axios.post(`${baseurl}/entry`, data);

function Form({ onVehicleEntry }) {
    const [vehiclenumber, setvehiclenumber] = useState("");
    const [vehicletype, setvehicletype] = useState("");
    const [manualId, setManualId] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    async function handlesubmit(e) {
        e.preventDefault();
        try {
            const res = await enterVehicle({ 
                numberplate: vehiclenumber, 
                type: vehicletype, 
                manualId: manualId 
            });
            setMessage("Vehicle entered successfully");
            setIsSuccess(true);
            setvehiclenumber("");
            setvehicletype("");
            setManualId("");
            if (onVehicleEntry) {
                onVehicleEntry();
            }
        } catch (error) {
            setMessage("Error in vehicle entry");
            setIsSuccess(false);
        }
        console.log({ vehiclenumber, type: vehicletype, manualId });
    }

    return (
        <div className="form-container">
            <h2>Vehicle Entry</h2>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="numberplate">Vehicle Number Plate</label>
                    <input 
                        type="text" 
                        id="numberplate"
                        name="numberplate" 
                        value={vehiclenumber} 
                        onChange={(e) => setvehiclenumber(e.target.value)}
                        placeholder="Enter number plate"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Vehicle Type</label>
                    <input 
                        type="text" 
                        id="type"
                        name="type" 
                        value={vehicletype} 
                        onChange={(e) => setvehicletype(e.target.value)}
                        placeholder="e.g., Car, Bike, Truck"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="manualId">Slot ID (Optional)</label>
                    <input 
                        type="text" 
                        id="manualId"
                        name="manualId" 
                        value={manualId} 
                        onChange={(e) => setManualId(e.target.value)}
                        placeholder="Enter specific slot ID"
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Enter Vehicle
                </button>
                {message && (
                    <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </form>
            <br/><br/>
            <VehicleSearch onVehicleEntry={onVehicleEntry}/>
        </div>
    );
}

export default Form;