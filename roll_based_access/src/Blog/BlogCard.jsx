import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";

export const BlogCard = ({imageUrl,description,title}) => {
    return (
        <div
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="p-5">
                <h2 className="text-xl font-semibold text-indigo-800 mb-3">
                    {title}
                </h2>
                <p className="text-gray-600 mb-5">{description}</p>
                <button className="text-indigo-500 font-medium hover:text-indigo-700 transition-colors">
                    Read More <FaLongArrowAltRight className='inline ml-2'/>
                </button>
            </div>
        </div>
    )
}
