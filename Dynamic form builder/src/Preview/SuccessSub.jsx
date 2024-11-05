import { createServer } from 'miragejs';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const SuccessSub = () => {
  const [savedData, setSavedData] = useState(null);

  createServer({
    routes() {
      this.get("/api/formData", () => {
        return JSON.parse(localStorage.getItem("saved-data"));
      });
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/formData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSavedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderData = (data) => {
    if (typeof data === 'object' && !Array.isArray(data)) {
      return Object.entries(data).map(([key, value]) => {
        if (typeof value === 'boolean' && value === true) {
          return (
            <div key={key} className="flex justify-between items-center p-2 border-b">
              <span className="font-medium">{key}</span>
            </div>
          );
        }
        return (
          <></>
        );
      });
    }
    else {
      return data;
    }
  };

  return (
    <div className='w-full min-h-screen bg-gray-200'>
      <div className="lg:w-[40%] md:w-[60%] sm:w-[70%] mx-auto mt-10 p-10 bg-gray-300 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-center">Success!</h2>
        <p className="mb-6 text-center">Your form has been saved successfully. Below is the saved data:</p>

        {savedData ? (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <ul className="space-y-2">
              {Object.entries(savedData).map(([key, value]) => (
                <li key={key} className="flex justify-between items-center p-2 border-b">
                  <span className="font-medium">{key}:</span>
                  <span className="text-gray-600">
                    {renderData(value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-600">No saved data found.</p>
        )}
      </div>
    </div>
  );
};
