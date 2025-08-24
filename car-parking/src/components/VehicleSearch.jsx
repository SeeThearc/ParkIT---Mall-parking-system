import { useState } from "react";
import axios from "axios";
import Checkout from "./Checkout";

const baseurl = "http://localhost:5000/api";

function VehicleSearch({onVehicleEntry}) {
    const [searchPlate, setSearchPlate] = useState("");
    const [filterType, setFilterType] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSearch = async () => {
        if (!searchPlate.trim()) return;
        setLoading(true);
        try {
            const res = await axios.get(`${baseurl}/vehicle?numberplate=${searchPlate}`);
            if (res.data?.numberplate) {
                setResult(res.data);
                setMessage("");
            } else {
                setResult(null);
                setMessage("Vehicle not found");
            }
            setVehicles([]);
        } catch (err) {
            setMessage("Error fetching vehicle");
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = async () => {
        if (!filterType) return;
        setLoading(true);
        try {
            const res = await axios.get(`${baseurl}/vehicles?type=${filterType}`);
            if (res.data.length === 0) {
                setMessage("No vehicles of this type found");
                setVehicles([]);
            } else {
                setVehicles(res.data);
                setMessage("");
            }
            setResult(null);
        } catch (err) {
            setMessage("Error filtering vehicles");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vehicle-search-container">
            <h2>Search or Filter Vehicles</h2>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search by Number Plate"
                    value={searchPlate}
                    onChange={(e) => setSearchPlate(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="action-btn">Search</button>

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="filter-select"
                >
                    <option value="">-- Filter by Type --</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="EV">EV</option>
                    <option value="handicap">Handicap</option>
                </select>
                <button onClick={handleFilter} className="action-btn">Filter</button>
            </div>

            {loading && <p>Loading...</p>}
            {message && <p className="error">{message}</p>}

            {result && (
                <div className="vehicle-result">
                    <h4>Vehicle Found:</h4>
                    <p><strong>Plate:</strong> {result.numberplate}</p>
                    <p><strong>Type:</strong> {result.type}</p>
                    <p><strong>Slot:</strong> {result.slotnumber || "Not assigned"}</p>
                    <p><strong>InTime:</strong> {result.intime}</p>
                    <p><strong>ExitTime:</strong> {result.exittime}</p>
                </div>
            )}

            {vehicles.length > 0 && (
                <div className="vehicle-list">
                    <h4>Filtered Vehicles:</h4>
                    <ul>
                        {vehicles.map((v, index) => (
                            <li key={index}>
                                <strong>{v.numberplate}</strong> — {v.type} — Slot: {v.slotnumber || "N/A"}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Checkout baseurl="http://localhost:5000/api" onVehicleEntry={onVehicleEntry}/>
        </div>
    );
}

export default VehicleSearch;