import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createServer } from "miragejs"

export const Preview = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state?.data;

  createServer({
    routes() {
      const savedData =null;
      this.post("/api/formData", (schema, request) => {
        const data = JSON.parse(request.requestBody); 
        localStorage.setItem("saved-data",JSON.stringify(data));
        return { message: "Data received successfully", data };
      });
      
      this.get("/api/formData", () => {
        return JSON.parse(localStorage.getItem("saved-data"));
      });
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit =async (data) => {
    try {
      const response = await fetch("/api/formData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });

      const result = await response.json(); 

      if (response.ok) {
        console.log("Data submitted successfully:", result);
        navigate("/success/submission");
      } else {
        console.error("Error submitting data:", result);
      }
    } catch (error) {
      console.error("Network error:", error);

    }
  };

  return (
    <div className='w-full min-h-screen bg-gray-200'>
      <div className="lg:w-[40%] md:w-[60%] sm:w-[70%]  mx-auto mt-10 p-[50px] bg-gray-300 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Dynamic Form Preview</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {receivedData.map((field) => {
            switch (field.fieldType) {
              case 'input':
                return (
                  <div className="mb-4" key={field.id}>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={field.data.inputName}>
                      {field.data.labelName}
                    </label>
                    <input
                      type={field.data.inputType}
                      id={field.data.inputName}
                      {...register(field.data.inputName, { required: true })}
                      className={`w-full px-4 py-2 border ${errors[field.data.inputName] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150`}
                      placeholder={`Enter your ${field.data.labelName.toLowerCase()}`}
                    />
                    {errors[field.data.inputName] && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                );

              case 'dropdown':
                return (
                  <div className="mb-4" key={field.id}>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={field.data.selectName}>
                      {field.data.labelName}
                    </label>
                    <select
                      id={field.data.selectName}
                      {...register(field.data.selectName, { required: true })}
                      className={`w-full px-4 py-2 border ${errors[field.data.selectName] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150`}
                    >
                      <option value="" disabled selected>
                        Choose an option
                      </option>
                      {field.data.options.map((optionObj, index) => (
                        <option key={index} value={optionObj.option}>
                          {optionObj.option}
                        </option>
                      ))}
                    </select>
                    {errors[field.data.selectName] && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                );

                case 'checkbox':
                  return (
                    <div className="mb-4" key={field.id}>
                      <label className="block text-gray-700 font-medium mb-2">{field.data.checkboxLabel}</label>
                      {field.data.checkboxes.map((checkboxObj, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`${field.data.checkboxName}-${index}`}
                            {...register(`${field.data.checkboxName}.${checkboxObj.checkbox}`)} // Register with the checkbox label as the key
                            className="mr-2"
                          />
                          <label htmlFor={`${field.data.checkboxName}-${index}`} className="text-gray-700">
                            {checkboxObj.checkbox}
                          </label>
                        </div>
                      ))}
                    </div>
                  );                

              case 'textarea':
                return (
                  <div className="mb-6" key={field.id}>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={field.data.textareaName}>
                      {field.data.textareaLabel}
                    </label>
                    <textarea
                      id={field.data.textareaName}
                      {...register(field.data.textareaName)}
                      rows={field.data.textareaRows}
                      className={`w-full px-4 py-2 border ${errors[field.data.textareaName] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150`}
                      placeholder={`Enter your ${field.data.textareaLabel.toLowerCase()}`}
                    ></textarea>
                  </div>
                );

              default:
                return null;
            }
          })}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
