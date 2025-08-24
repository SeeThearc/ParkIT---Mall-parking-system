import { useState } from "react";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import './index.css';

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleVehicleEntry = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="App">
            <div className="main-header">
                <h1>Mall Parking Management System</h1>
            </div>
            <Form onVehicleEntry={handleVehicleEntry} />
            <Dashboard refreshTrigger={refreshTrigger} />
        </div>
    );
}

export default App;