import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';

export const Dropdown = ({ openModal, setOpenModal, setFormData,editFlag,setEditOpenModal ,setEditFlag , modalData, setModalData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setValue
    } = useForm();

    const [optionName,setOptionName] = useState("");
    const [optionsList,setOptionsList] = useState([]);

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
            fieldType:openModal.field,
        }
        
        setFormData((prev)=>{
            prev.push(fieldData);
            return prev;
        })
        setOpenModal(false);
        reset();
    };

    useEffect(()=>{
        setValue("options",optionsList);
    },[optionsList]);

    useEffect(()=>{
        if(editFlag && editFlag){
            setValue("selectName",modalData.data.selectName);
            setValue("labelName",modalData.data.labelName);
            setValue("options",modalData.data.options);
            setOptionsList(modalData.data.options);
    }
    },[]);

    return (
        <>

            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6 ">Add Dropdown Field</h2>

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
                <div className='flex flex-row gap-2 justify-center items-center'>
                    <label className="block text-gray-700 font-medium mb-2">Dropdown Option</label>
                  
                  <input type="text" 
                  value={optionName}
                  onChange={(e)=>{
                    setOptionName(e.target.value);
                  }} 
                  className=" px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                    <button
                        type="button"
                        className="mt-3 bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                        onClick={()=>{
                            setOptionsList((pre)=>[...pre,optionName]);
                            setOptionName("");
                        }}
                    >
                        Add
                    </button>
                </div>
                {
                    optionsList.length >0 &&
                    <div className='flex flex-col border-2 p-2 border-slate-400 rounded-md'>
                    {
                        optionsList.map((option,index)=>(
                            <p key={index}
                            className='flex flex-row gap-4 items-center'
                            > <span className=' p-1 break-all w-[90%]'>{index+1}{". "}{option}</span> <RxCross2 
                            className='text-xl text-red-500 hover:bg-slate-400 cursor-pointer transition-all duration-150 rounded-full'
                            onClick={()=>{
                                setOptionsList((pre)=>(pre.filter((option,i)=>(i!==index))))
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
                      {editFlag ? "Save Dropdown": "Add Dropdown"}
                    </button>
                </div>
            </form>
        </>
    );
};
