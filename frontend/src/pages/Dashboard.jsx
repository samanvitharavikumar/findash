import { useEffect } from "react";

function Dashboard() {

    useEffect(() => {

        console.log("Dashboard Loaded");

    }, []);

    return (
        <div>

            <h1>Welcome to FinDash 🎉</h1>

        </div>
    );

}

export default Dashboard;