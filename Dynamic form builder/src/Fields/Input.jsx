import React from 'react'

export const Input = ({item,handleInputChange}) => {
    return (
        <>
            <input
                placeholder='Enter the text'
                onChange={(e) => handleInputChange(e, item.id)}
                className="outline-none border-2 p-2 border-slate-300"
                value={item.text}
                type="text"
            />
        </>
    )
}
