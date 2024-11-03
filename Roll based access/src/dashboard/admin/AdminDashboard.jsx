import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export const AdminDashboard = () => {
    const [userGrowthData, setUserGrowthData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://6724bca8c39fedae05b28c19.mockapi.io/users");
            const users = await response.json();
            
            const growthData = calculateUserGrowth(users);
            setUserGrowthData(growthData);
        };

        fetchData();
    }, []);

    const calculateUserGrowth = (users) => {
        const growthMap = {};
        users.forEach(user => {
            const date = new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
            growthMap[date] = (growthMap[date] || 0) + 1;
        });

        const dates = Object.keys(growthMap);
        const counts = dates.map(date => growthMap[date]);

        return {
            labels: dates,
            datasets: [
                {
                    label: "User Growth",
                    data: counts,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    tension: 0.2,
                },
            ],
        };
    };

    return (
        <div className="p-8 min-h-screen bg-gradient-to-b from-indigo-100 to-indigo-300">
            <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">Admin Dashboard</h1>
            <div className="bg-white rounded-lg shadow-lg p-5 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-center mb-6">User Growth Over Time</h2>
                {userGrowthData ? (
                    <Line data={userGrowthData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: "top",
                            },
                        },
                        scales: {
                            y: { beginAtZero: true },
                        },
                    }} />
                ) : (
                    <p className="text-center text-gray-600">Loading chart...</p>
                )}
            </div>
        </div>
    );
};
