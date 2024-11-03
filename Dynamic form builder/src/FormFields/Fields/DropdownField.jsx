import React, { useState } from 'react';
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { Modal } from '../../Components/Modal';

export const DropdownField = ({ data,id,setFormData }) => {
  

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
    <div className="flex flex-wrap items-center gap-4 py-3 px-4 border rounded-lg shadow-sm w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mt-2 mx-auto">
      <label htmlFor={data.selectName} className="text-base font-semibold text-gray-800 min-w-fit">
        {data.labelName} :
      </label>

      <select
        id={data.selectName}
        name={data.selectName}
        className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150 ease-in-out"
      >
        <option value="" disabled selected>
          Choose a value
        </option>
        {data.options.map((optionObj, index) => (
          <option key={index} value={optionObj.option} className="text-gray-700">
            {optionObj.option}
          </option>
        ))}
      </select>

      <button 
        onClick={()=>{
          editHandler();
        }}
      type="button" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-full transition duration-150 ease-in-out">
        <TiEdit className="w-5 h-5" />
      </button>

      <button type="button" className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition duration-150 ease-in-out"
      onClick={()=>{
        deleteHandler(id);
      }}
      >
        <MdDelete className="w-5 h-5" />
      </button>
      {
        openEditModal && <Modal setFormData={setFormData} openModal={{field:"dropdown"}} editFlag={editFlag} setEditFlag={setEditFlag} setEditOpenModal={setEditOpenModal} modalData={modalData} setModalData={setModalData} />
      }
    </div>
  );
};
