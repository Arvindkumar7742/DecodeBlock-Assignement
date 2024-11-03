import React from 'react'
import { InputField } from './Fields/InputField'
import { DropdownField } from './Fields/DropdownField'
import { TextareaField } from './Fields/TextareaField'
import { CheckboxField } from './Fields/CheckboxField'
import { Reorder, useDragControls } from 'framer-motion'
import { PiDotsNineBold } from 'react-icons/pi'

export const FormField = ({ formData, setFormData }) => {
    const controls = useDragControls();

    return (
        <div>{
            (formData.length > 0) &&
            (<div className='flex flex-col mt-5'>
                <Reorder.Group axis="y" values={formData} onReorder={setFormData}>
                    {
                        formData.map((field) => (
                            <Reorder.Item
                                key={field.id}
                                value={field}
                                dragListener={true} // Allow drag listener for each item
                                dragControls={controls}
                            >
                                <div className='flex flex-row gap-2 items-center'>

                                    {
                                        field.fieldType === "input" && (<InputField data={field.data} controls={controls} />)
                                    }
                                    {
                                        field.fieldType === "dropdown" && <DropdownField data={field.data} controls={controls} />
                                    }
                                    {
                                        field.fieldType === "checkbox" && <CheckboxField data={field.data} controls={controls} />
                                    }
                                    {
                                        field.fieldType === "textarea" && <TextareaField data={field.data} controls={controls} />
                                    }
                                </div>
                            </Reorder.Item>
                        ))
                    }
                </Reorder.Group>
                <div className="flex justify-center">
                    <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white 
                    font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out
                     hover:bg-indigo-700 hover:shadow-xl hover:scale-105 active:scale-95 mt-10">
                        Generate Preview
                    </button>
                </div>
            </div>)
        }</div>
    )
}
