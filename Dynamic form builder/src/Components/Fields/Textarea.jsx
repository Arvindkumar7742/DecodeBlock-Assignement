import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

export const Textarea = ({ openModal, setOpenModal,setFormData, editFlag,setEditOpenModal ,setEditFlag , modalData, setModalData }) => {

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
            setValue("textareaName",modalData.data.textareaName);
            setValue("textareaLabel",modalData.data.textareaLabel);
            setValue("textareaRows",modalData.data.textareaRows);
        }
    },[]);

    return (
        <>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Add Textarea Field</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Textarea Name Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="textareaName">
                        Textarea Name
                    </label>
                    <input
                        type="text"
                        id="textareaName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("textareaName", { required: "Textarea name is required" })}
                    />
                    {errors.textareaName && (
                        <p className="text-red-500 text-sm mt-1">{errors.textareaName.message}</p>
                    )}
                </div>

                {/* Textarea Label Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="textareaLabel">
                        Textarea Label
                    </label>
                    <input
                        type="text"
                        id="textareaLabel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("textareaLabel", { required: "Textarea label is required" })}
                    />
                    {errors.textareaLabel && (
                        <p className="text-red-500 text-sm mt-1">{errors.textareaLabel.message}</p>
                    )}
                </div>

                {/* Textarea Rows Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="textareaRows">
                        Rows
                    </label>
                    <input
                        type="number"
                        id="textareaRows"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        min="1"
                        {...register("textareaRows", {
                            required: "Rows is required",
                            min: { value: 1, message: "Rows must be at least 1" }
                        })}
                    />
                    {errors.textareaRows && (
                        <p className="text-red-500 text-sm mt-1">{errors.textareaRows.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    >
                       {editFlag ? "Save Textarea":"Add Textarea"}
                    </button>
                </div>
            </form>
        </>
    )
}
