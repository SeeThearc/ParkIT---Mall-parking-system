import { useEffect, useState } from "react";
import axios from "axios";

const baseurl = "http://localhost:5000/api";

function Dashboard({ refreshTrigger }) {
    const [data, setData] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [slotrem,setSlotrem] = useState("");

    const fetchData = async () => {
        try {
            const res = await axios.get(`${baseurl}/dashboard`);
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshTrigger]);
    
    if (!data) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Parking Dashboard</h2>
            
            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-label">Total Slots</div>
                    <div className="stat-value">{data.total}</div>
                </div>
                <div className="stat-card available">
                    <div className="stat-label">Available</div>
                    <div className="stat-value">{data.available}</div>
                </div>
                <div className="stat-card occupied">
                    <div className="stat-label">Occupied</div>
                    <div className="stat-value">{data.occupied}</div>
                </div>
                <div className="stat-card maintenance">
                    <div className="stat-label">Maintenance</div>
                    <div className="stat-value">{data.maintainance}</div>
                </div>
            </div>

            <div className="type-status-section">
                <h3>By Type & Status:</h3>
                <ul className="dashboard-list">
                    {data.bytypecount.map((entry, index) => (
                        <li key={index} data-status={entry._id.status}>
                            <span className="list-item-type">{entry._id.type}</span>
                            <span 
                                className="list-item-status" 
                                data-status={entry._id.status}
                            >
                                {entry._id.status}
                            </span>
                            <span className="list-item-count">{entry.count}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="maintenance-section">
        <h3>Mark Slot as Maintenance</h3>
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                if (!selectedSlot) return;

                try {
                    await axios.put(`${baseurl}/slots/${selectedSlot}/maintenance`);
                    await fetchData();
                    setSelectedSlot("");
                } catch (err) {
                    console.error(err);
                }
            }}
        >
            <label>
                Slot Number:
                <input
                        type="text"
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        placeholder="Enter Slot Number"
                        required
                    />
                </label>    
                <button type="submit">Mark as Maintenance</button>
            </form>
            <br />
            <h3>Remove Slot from Maintenance</h3>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    if (!slotrem) return;

                    try {
                        await axios.put(`${baseurl}/slots/${slotrem}/maintenance-remove`);
                        await fetchData();
                        setSlotrem("");
                    } catch (err) {
                        console.error(err);
                    }
                }}
            >
                <label>
                    Slot Number:
                    <input
                            type="text"
                            value={slotrem}
                            onChange={(e) => setSlotrem(e.target.value)}
                            placeholder="Enter Slot Number"
                            required
                        />
                    </label>    
                    <button type="submit">Remove from Maintenance</button>
                </form>
        </div>
        </div>
    );
}

export default Dashboard;