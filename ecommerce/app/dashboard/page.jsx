"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

const dashboardPage = () => {
    const [dash, setDash] = useState([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await axios.get("http://localhost:8800/dashboard");
                sessionStorage.setItem("isLoggedIn", "true");
                setDash(res.data);
            }
            catch(err) {
                console.log(err);
            }
        };
        fetchDashboard();
    }, []);

    return(
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-semibold mb-4">Mi Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {dash.map((item, index) => (
                    <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default dashboardPage;