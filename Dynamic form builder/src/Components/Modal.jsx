import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Input } from './Fields/Input';
import { Dropdown } from './Fields/Dropdown';
import { CheckBox } from './Fields/CheckBox';
import { Textarea } from './Fields/Textarea';

export const Modal = ({ openModal, setOpenModal, setFormData }) => {

    if (!openModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative mx-4">
                <button
                    onClick={() => setOpenModal(null)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                >
                    <RxCross2 size={24} />
                </button>
                {
                    openModal.field == "input" && <Input openModal={openModal} setOpenModal={setOpenModal} setFormData={setFormData}/>
                }
                {
                    openModal.field == "dropdown" && <Dropdown openModal={openModal} setOpenModal={setOpenModal} setFormData={setFormData}/>
                }
                {
                    openModal.field == "checkbox" && <CheckBox openModal={openModal} setOpenModal={setOpenModal} setFormData={setFormData}/>
                }
                {
                    openModal.field == "textarea" && <Textarea openModal={openModal} setOpenModal={setOpenModal} setFormData={setFormData}/>
                }
            </div>
        </div>
    );
};