import React from 'react'

export const Select = ({item,handleSelectChange}) => {
    return (
        <>
            <select name={item.text} id={item.text}
                onChange={(e) => {
                    handleSelectChange(e, item.id);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-700"
            >
                <option value="" disabled selected>
                    Choose a role
                </option>
                {
                    item.options.map((option) => (
                        <option value={option}>{option}</option>
                    ))
                }
            </select>
        </>
    )
}
