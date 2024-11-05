import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';

export const CheckBox = ({ openModal, setOpenModal, setFormData, editFlag, setEditOpenModal, setEditFlag, modalData, setModalData }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const [optionName, setOptionName] = useState("");
    const [checkboxes, setCheckboxes] = useState([]);

    const onSubmit = (data) => {

        if (editFlag) {
            setFormData((prev) => {
                const updateData = prev.map((formData) => {
                    if (formData.id === modalData.id) {
                        return {
                            ...formData,
                            data
                        }
                    }
                    else {
                        return formData;
                    }
                })
                return updateData;
            })
            setEditFlag(false);
            setModalData(null);
            setEditOpenModal(false);
            return;
        }
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

    useEffect(() => {
        setValue("checkboxes", checkboxes);
    }, [checkboxes]);

    useEffect(() => {
        if (editFlag && editFlag) {
            setValue("checkboxName", modalData.data.checkboxName);
            setValue("checkboxLabel", modalData.data.checkboxLabel);
            setValue("checkboxes", modalData.data.checkboxes);
            setCheckboxes(modalData.data.checkboxes);
        }
    }, []);


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

                {/* checkbox Dynamic Field */}
                <div className='flex flex-row gap-2 justify-center items-center'>
                    <label className="block text-gray-700 font-medium mb-2">Add Checkbox</label>

                    <input type="text"
                        value={optionName}
                        onChange={(e) => {
                            setOptionName(e.target.value);
                        }}
                        className=" px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="button"
                        className="mt-3 bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                        onClick={() => {
                            if(optionName!==""){
                            setCheckboxes((pre) => [...pre, optionName]);
                            setOptionName("");
                            }
                        }}
                    >
                        Add
                    </button>
                </div>
                {
                    checkboxes.length > 0 &&
                    <div className='flex flex-col gap-2 border-2 p-2 border-slate-400 rounded-md'>
                        {
                            checkboxes.map((checkbox, index) => (
                                <p key={index}
                                    className='flex flex-row gap-4 items-center border-2 rounded-lg p-1'
                                > <span className=' p-1 break-all w-[90%]'>{index + 1}{". "}{checkbox}</span> <RxCross2
                                        className='text-xl text-red-500 hover:bg-slate-400 cursor-pointer transition-all duration-150 rounded-full'
                                        onClick={() => {
                                            setCheckboxes((pre) => (pre.filter((option, i) => (i !== index))))
                                        }}
                                    /> </p>
                            ))
                        }
                    </div>
                }

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    >
                        {editFlag ? "Save Checkbox": "Add Checkbox"}
                    </button>
                </div>
            </form>
        </>
    )
}
