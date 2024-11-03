import React from 'react'
import { InputField } from './Fields/InputField'
import { DropdownField } from './Fields/DropdownField'
import { TextareaField } from './Fields/TextareaField'
import { CheckboxField } from './Fields/CheckboxField'

export const FormField = ({ formData }) => {

    return (
        <div>{
            (formData.length > 0) &&
            (<div className='flex flex-col mt-5'>
                {
                    formData.map((field) => (
                        <div>
                            {
                                field.fieldType == "input" && (<InputField data={field.data} />)
                            }
                            {
                                field.fieldType == "dropdown" && <DropdownField data={field.data} />
                            }
                            {
                                field.fieldType == "checkbox" && <CheckboxField data={field.data} />
                            }
                            {
                                field.fieldType == "textarea" && <TextareaField data={field.data} />
                            }
                        </div>
                    ))
                }
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
