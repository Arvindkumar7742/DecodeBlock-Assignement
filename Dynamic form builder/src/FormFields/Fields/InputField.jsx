import React from 'react';
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

export const InputField = ({ data }) => {
  // Edit and delete ke liye logic likhna hai...
  return (
    <div className="flex flex-wrap items-center gap-1 py-3 px-4 border rounded-lg shadow-sm w-full sm:w-[95%] md:w-[60%] lg:w-[50%] mt-2 mx-auto">
      <label htmlFor={data.inputName} className="text-base font-semibold text-gray-800 min-w-fit">
        {data.labelName} : 
      </label>
      
      <input
        type={data.inputType}
        id={data.inputName}
        name={data.inputName}
        className="flex-grow border border-gray-300 rounded-lg px-2 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150 ease-in-out"
        placeholder={`Enter ${data.labelName.toLowerCase()}`}
      />
      
      <button type="button" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-full transition duration-150 ease-in-out">
        <TiEdit className="w-5 h-5" />
      </button>
      
      <button type="button" className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition duration-150 ease-in-out">
        <MdDelete className="w-5 h-5" />
      </button>
    </div>
  );
};