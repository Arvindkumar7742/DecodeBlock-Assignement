import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/FormateDate';

export const ManageUsers = () => {

    const basURl = "https://6724bca8c39fedae05b28c19.mockapi.io/users";
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState("all");

    // Fetch all user data
    async function fetchUserData() {
        try {
            const response = await fetch(basURl);
            const userData = await response.json();
            if (userData.length > 0) {
                setUsers(userData);
                setFilteredUsers(userData);
            }
        } catch (error) {
            console.log("ERROR WHILE FETCHING ALL THE USER DATA IN MANAGE USERS:::", error);
        }
    }

    async function onDelete(userId) {
        try {
            await fetch(`${basURl}/${userId}`, { method: "DELETE" });
            fetchUserData();
            toast.success("User Deleted Successfully");
        } catch (error) {
            console.log("ERROR WHILE DELETING USER IN MANAGE USERS:::", error);
        }
    }

    useEffect(() => {
        let cutoffDate = new Date();
        if (filter === "yesterday") {
            cutoffDate.setDate(cutoffDate.getDate() - 1);
        } else if (filter === "last2days") {
            cutoffDate.setDate(cutoffDate.getDate() - 2);
        } else if (filter === "last3days") {
            cutoffDate.setDate(cutoffDate.getDate() - 3);
        } else if (filter === "all") {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter(user => {
            const createdAt = new Date(user.createdAt);
            return createdAt >= cutoffDate;
        });
        setFilteredUsers(filtered);
    }, [filter, users]);

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen bg-indigo-50 py-10 px-5">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-8">
                User Management
            </h1>

            {/* Time Filter Selection */}
            <div className="flex justify-center mb-6">
                <label className="mr-4 font-medium text-indigo-600">Show Users From:</label>
                <select
                    className="p-2 rounded-md border border-indigo-300 bg-white text-indigo-700"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Time</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="last2days">Last 2 Days</option>
                    <option value="last3days">Last 3 Days</option>
                </select>
            </div>

            {/* User Table */}
            {filteredUsers.length === 0 ? (
                <div className="text-center text-xl text-indigo-500 mt-10">No users found for the selected period.</div>
            ) : (
                <div className="max-w-5xl mx-auto bg-indigo-100 shadow-lg rounded-lg overflow-hidden">
                    <div className="grid grid-cols-5 sm:grid-cols-6 p-5 bg-indigo-600 text-white font-semibold">
                        <p className="col-span-2 sm:col-span-2 text-center">User Name</p>
                        <p className="text-center">Email</p>
                        <p className="text-center hidden sm:block">Role</p>
                        <p className="text-center hidden sm:block">Created At</p>
                        <p className="text-center">Actions</p>
                    </div>

                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="grid grid-cols-5 sm:grid-cols-6 gap-4 p-5 items-center border-b border-indigo-300 bg-white hover:bg-indigo-50 transition-colors duration-200"
                        >
                            <p className="col-span-2 sm:col-span-2 text-center text-indigo-800 font-medium">
                                {user.userName}
                            </p>
                            <p className="text-center text-gray-700">{user.email}</p>
                            <p className="text-center text-gray-600 hidden sm:block">{user.role}</p>
                            <p className="text-center text-gray-500 hidden sm:block">{formatDate(user.createdAt)}</p>
                            <button
                                onClick={() => onDelete(user.id)}
                                className="text-red-500 font-semibold bg-red-100 px-3 py-1 rounded-md hover:bg-red-200 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
