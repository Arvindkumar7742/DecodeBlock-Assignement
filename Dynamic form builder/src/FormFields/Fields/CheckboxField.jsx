import React from 'react';
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

export const CheckboxField = ({ data }) => {
  console.log("Printing the data:::", data);

  return (
    <div className="flex flex-wrap items-start gap-4 py-3 px-4 border rounded-lg shadow-sm w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mt-2 mx-auto">
      <label className="text-base font-semibold text-gray-800 min-w-fit">
        {data.checkboxLabel} :
      </label>

      <div className="flex flex-row gap-2 flex-grow">
    { data.checkboxes.map((checkboxObj, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${data.checkbox}-${index}`}
              name={data.checkbox}
              value={checkboxObj.checkbox}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={`${data.checkbox}-${index}`} className="text-gray-700">
              {checkboxObj.checkbox}
            </label>
          </div>
        ))}
      </div>

      <button type="button" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-full transition duration-150 ease-in-out">
        <TiEdit className="w-5 h-5" />
      </button>
      
      <button type="button" className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition duration-150 ease-in-out">
        <MdDelete className="w-5 h-5" />
      </button>
    </div>
  );
};
