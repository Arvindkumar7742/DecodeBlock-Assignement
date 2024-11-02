import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DashboardNavbar = () => {
  const user = JSON.parse(localStorage.getItem("blog-user"));
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-indigo-900 shadow-lg text-[#F1F2FF] border-b border-[#4c6899] ">
      <div className="text-3xl font-semibold tracking-wide">
        Welcome, <span className="text-indigo-200 font-bold">{user?.userName}</span>!
      </div>
      <div className="flex items-center space-x-6">
        <button
          onClick={() => navigate('/blogs')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Blogs
        </button>
        <button
          onClick={() => navigate('/dashboard/settings')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Settings
        </button>
      </div>
    </div>
  );
};
