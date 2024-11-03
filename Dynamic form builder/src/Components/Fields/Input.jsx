import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

export const Input = ({openModal,setOpenModal, setFormData,editFlag,setEditOpenModal ,setEditFlag , modalData, setModalData}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const onSubmit = (data) => {
        if(editFlag){
            setFormData((prev)=>{
                const updateData = prev.map((formData)=>{
                    if(formData.id === modalData.id){
                        return {
                            ...formData,
                            data
                        }
                    }
                    else{
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
        const fieldData ={
            id:Date.now(),
            data,
            fieldType:openModal.field
        }
        setFormData((prev)=>{
            prev.push(fieldData);
            return prev;
        })
        setOpenModal(false); 
        reset();
    };

    useEffect(()=>{
        if(editFlag && editFlag){
            setValue("inputName",modalData.data.inputName);
            setValue("labelName",modalData.data.labelName);
            setValue("inputType",modalData.data.inputType);
        }
    },[]);

    return (
        <>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Add Input Field</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Input Name Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="inputName">
                        Name
                    </label>
                    <input
                        type="text"
                        id="inputName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("inputName", { required: "Input name is required" })}
                    />
                    {errors.inputName && (
                        <p className="text-red-500 text-sm mt-1">{errors.inputName.message}</p>
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

                {/* Input Type Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="inputType">
                        Input Type
                    </label>
                    <select
                        id="inputType"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("inputType", { required: "Input type is required" })}
                    >
                        <option value="">Select type</option>
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                        <option value="password">Password</option>
                    </select>
                    {errors.inputType && (
                        <p className="text-red-500 text-sm mt-1">{errors.inputType.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    >
                       {editFlag ? "Save field":"Add Field"}
                    </button>
                </div>
            </form>
        </>
    )
}
