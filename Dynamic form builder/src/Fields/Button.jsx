import React from 'react'

export const Button = ({text}) => {
    return (
        <>
            <button
                className="text-white bg-blue-800 rounded-md p-2 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
            >
                {text}
            </button>
        </>
    )
}
