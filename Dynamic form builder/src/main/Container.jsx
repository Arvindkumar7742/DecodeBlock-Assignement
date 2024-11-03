import React, { useState } from 'react'
import { formFields } from '../utils/FormFields.js';
import { Modal } from '../Components/Modal';
import { FormField } from '../FormFields/FormField.jsx';

export const Container = () => {
    const [formData, setFormData] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    console.log("update form data1212:::",JSON.stringify(formData));

    function openModalHandler(field) {
        setOpenModal({
            field
        })
    }
    return (
        <div className="bg-gray-300 p-8 w-full rounded-lg shadow-lg mx-4">
            <header className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Welcome to the Dynamic Form Builder!</h2>
                <p className="text-gray-600 text-lg mt-2">Add, edit, or remove form inputs to build your custom form.</p>
            </header>

            <div className="flex flex-wrap justify-center gap-4">
                {
                    formFields.map((field) => {
                        if (field.type === 'input') {
                            return (<button
                                key={field.id}
                                onClick={() => openModalHandler(field.type)}
                                className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition duration-200">
                                Add Input
                            </button>)
                        }
                        else if (field.type === 'dropdown') {
                            return (<button
                                key={field.id}
                                onClick={() => openModalHandler(field.type)}
                                className="bg-purple-500 text-white py-3 px-6 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 text-base transition duration-200">
                                Add Dropdown
                            </button>)
                        }
                        else if (field.type === 'checkbox') {
                            return (<button
                                key={field.id}
                                onClick={() => openModalHandler(field.type)}
                                className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-base transition duration-200">
                                Add Checkbox
                            </button>)
                        }
                        else {
                            return (<button
                                key={field.id}
                                onClick={() => openModalHandler(field.type)}
                                className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-base transition duration-200">
                                Add Textarea
                            </button>)
                        }
                    })
                }
            </div>

            <div>
                <FormField formData={formData} setFormData={setFormData}/>
            </div>
            {
                openModal && <Modal openModal={openModal} setOpenModal={setOpenModal} setFormData={setFormData}/>
            }
        </div>
    )
}
