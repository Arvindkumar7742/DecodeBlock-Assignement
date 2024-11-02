import { useNavigate } from "react-router-dom"
import IconBtn from "../../Components/IconBtn"
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditProfile() {

  const navigate = useNavigate()
  const [userName,setUserName] = useState(null);
  const [email,setEmail] = useState(null);
  const [address,setAddress] = useState(null);

  const basURl = "https://6724bca8c39fedae05b28c19.mockapi.io/users";
  const user = JSON.parse(localStorage.getItem("blog-user"));

  const submitProfileForm =async(e) => {
    e.preventDefault();
   try{
    const updatedUser = {
      ...user,
      userName:userName ? userName :user.userName,
      email:email ? email :user.email,
      address:address ? address :user.address,
    }
    const response = await fetch(basURl+ `/${user.id}`,{
      method:"PUT",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updatedUser)
    });
    const data = await response.json();
    localStorage.setItem("blog-user",JSON.stringify(data));
    toast.success("user updated successfully");
    navigate("/dashboard/my-profile")
   }catch(error){
    console.log("ERROR IN UPDATING PROFILE OF THE USER::::",error);
   }
  }
  return (
    <>
      <form onSubmit={submitProfileForm} className="text-[#f2f2f5]">
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-[#032833] bg-indigo-900 p-8 px-12">
          <h2 className="text-lg font-semibold text-[#F1F2FF]">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                defaultValue={user?.userName}
                onChange={(e)=>{
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" >
                email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                defaultValue={user?.email}
                onChange={(e)=>{
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="address" >
                Address
              </label>
              <textarea
                id="address"
                rows="1"
                placeholder="Enter your address"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                defaultValue={user?.address}
                onChange={(e)=>{
                  setAddress(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-[#2C333F] py-2 px-5 font-semibold text-[#F1F2FF]"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  )
}