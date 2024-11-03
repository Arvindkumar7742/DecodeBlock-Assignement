import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';

export const CheckBox = ({ openModal, setOpenModal, setFormData }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            checkboxes: [{ checkbox: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'checkboxes',
    });

    const onSubmit = (data) => {
        const fieldData = {
            id: Date.now(),
            data,
            fieldType: openModal.field,
        }
        setFormData((prev) => {
            prev.push(fieldData);
            return prev;
        })
        setOpenModal(false);
        reset();
    };


    return (
        <>

            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Add Checkbox Field</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Checkbox Name Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="checkboxName">
                        Checkbox Name
                    </label>
                    <input
                        type="text"
                        id="checkboxName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("checkboxName", { required: "Checkbox name is required" })}
                    />
                    {errors.checkboxName && (
                        <p className="text-red-500 text-sm mt-1">{errors.checkboxName.message}</p>
                    )}
                </div>

                {/* Checkbox Label Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="checkboxLabel">
                        Checkbox Label
                    </label>
                    <input
                        type="text"
                        id="checkboxLabel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("checkboxLabel", { required: "Checkbox label is required" })}
                    />
                    {errors.checkboxLabel && (
                        <p className="text-red-500 text-sm mt-1">{errors.checkboxLabel.message}</p>
                    )}
                </div>

                {/* Dynamic Checkbox Options */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Checkbox Options</label>
                    <div className="space-y-2">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder={`Option ${index + 1}`}
                                    {...register(`checkboxes.${index}.checkbox`, { required: "Option is required" })}
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
                        {errors.checkboxes && errors.checkboxes.map((error, index) => (
                            <p key={index} className="text-red-500 text-sm mt-1">{error.checkbox?.message}</p>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => append({ checkbox: '' })}
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
                        Add Checkbox
                    </button>
                </div>
            </form>
        </>
    )
}
