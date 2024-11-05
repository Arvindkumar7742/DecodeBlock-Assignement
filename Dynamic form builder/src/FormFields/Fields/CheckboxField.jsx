import React, { useState } from 'react';
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { Modal } from '../../Components/Modal';

export const CheckboxField = ({ data,id, setFormData}) => {


  const [openEditModal,setEditOpenModal] = useState(false);
  const [editFlag,setEditFlag] = useState(false);
  const [modalData,setModalData] = useState({data,id});

  function editHandler(){
    setEditOpenModal(true);
    setEditFlag(true);
    setModalData({data:data,id:id,fieldType:"input"});
  }

  function deleteHandler(id) {
    setFormData((prev) => prev.filter((formData) => formData.id !== id));
  }


  return (
    <div className="flex flex-wrap items-start gap-4 py-3 px-4 border rounded-lg shadow-sm w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mt-2 mx-auto">
      <label className="text-base font-semibold text-gray-800 min-w-fit">
        {data.checkboxLabel} :
      </label>

      <div className="flex flex-row gap-2 flex-grow">
        {data.checkboxes.map((checkbox, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${checkbox}`}
              name={checkbox}
              value={checkbox}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={`${checkbox}`} className="text-gray-700">
              {checkbox}
            </label>
          </div>
        ))}
      </div>

      <button 
       onClick={()=>{
        editHandler();
      }}
      type="button" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-full transition duration-150 ease-in-out">
        <TiEdit className="w-5 h-5" />
      </button>

      <button
        onClick={() => {
          deleteHandler(id);
        }}
        type="button" className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition duration-150 ease-in-out">
        <MdDelete className="w-5 h-5" />
      </button>
      {
        openEditModal && <Modal setFormData={setFormData} openModal={{field:"checkbox"}} editFlag={editFlag} setEditFlag={setEditFlag} setEditOpenModal={setEditOpenModal} modalData={modalData} setModalData={setModalData} />
      }
    </div>
  );
};
