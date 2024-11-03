import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';

export const Dropdown = ({ openModal, setOpenModal, setFormData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues: {
            options: [{ option: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options',
    });

    const onSubmit = (data) => {
        const fieldData ={
            id:Date.now(),
            data,
            fieldType:openModal.field,
        }
        setFormData((prev)=>{
            prev.push(fieldData);
            return prev;
        })
        setOpenModal(false);
        reset();
    };

    if (!openModal) return null;

    return (
        <>

            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Add Dropdown Field</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Select Name Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="selectName">
                        Name
                    </label>
                    <input
                        type="text"
                        id="selectName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("selectName", { required: "Select name is required" })}
                    />
                    {errors.selectName && (
                        <p className="text-red-500 text-sm mt-1">{errors.selectName.message}</p>
                    )}
                </div>

                {/* Label Name Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="labelName">
                        Label
                    </label>
                    <input
                        type="text"
                        id="labelName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("labelName", { required: "Label name is required" })}
                    />
                    {errors.labelName && (
                        <p className="text-red-500 text-sm mt-1">{errors.labelName.message}</p>
                    )}
                </div>

                {/* Options Dynamic Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Dropdown Options</label>
                    <div className="space-y-2">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder={`Option ${index + 1}`}
                                    {...register(`options.${index}.option`, { required: "Option is required" })}
                                />
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                    onClick={() => remove(index)}
                                >
                                    <RxCross2 size={20} />
                                </button>
                            </div>
                        ))}
                        {errors.options && errors.options.map((error, index) => (
                            <p key={index} className="text-red-500 text-sm mt-1">{error.option?.message}</p>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => append({ option: '' })}
                        className="mt-3 bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                    >
                        Add Option
                    </button>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    >
                        Add Dropdown
                    </button>
                </div>
            </form>
        </>
    );
};
