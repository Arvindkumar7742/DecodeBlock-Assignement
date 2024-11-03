import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { TiEdit } from 'react-icons/ti'
import { Modal } from '../../Components/Modal';

export const TextareaField = ({data,id,setFormData}) => {
    
  const [openEditModal,setEditOpenModal] = useState(false);
  const [editFlag,setEditFlag] = useState(false);
  const [modalData,setModalData] = useState({data,id});

  function editHandler(){
    setEditOpenModal(true);
    setEditFlag(true);
    setModalData({data:data,id:id,fieldType:"input"});
  }

  function deleteHandler(id){
    setFormData((prev)=>prev.filter((formData)=>formData.id!==id));
  }

  return (
    <div className="flex flex-wrap items-center gap-1 py-3 px-4 border rounded-lg shadow-sm w-full sm:w-[95%] md:w-[60%] lg:w-[50%] mt-2 mx-auto">
      <label htmlFor={data.textareaName} className="text-base font-semibold text-gray-800 min-w-fit">
        {data.textareaLabel} : 
      </label>
      
      <textarea
        id={data.textareaName}
        rows={data.textareaRows}
        name={data.inputName}
        className="flex-grow border border-gray-300 rounded-lg px-2 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150 ease-in-out"
        placeholder={`Enter ${data.textareaLabel.toLowerCase()}`}
      />
      
      <button
      onClick={()=>{
        editHandler()
      }}
      type="button" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-full transition duration-150 ease-in-out">
        <TiEdit className="w-5 h-5" />
      </button>
      
      <button 
          onClick={()=>{
            deleteHandler(id);
          }}
      type="button" className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition duration-150 ease-in-out">
        <MdDelete className="w-5 h-5" />
      </button>
      {
        openEditModal && <Modal setFormData={setFormData} openModal={{field:"textarea"}} editFlag={editFlag} setEditFlag={setEditFlag} setEditOpenModal={setEditOpenModal} modalData={modalData} setModalData={setModalData} />
      }
    </div>
  )
}
