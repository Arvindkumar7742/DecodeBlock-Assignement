import React, { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../Components/IconBtn"
import toast from "react-hot-toast"

export default function UpdatePassword() {

  const basURl = "https://6724bca8c39fedae05b28c19.mockapi.io/users";
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("blog-user"));
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currPassword, setCurrPassword] = useState(true);
  const [newPassword, setNewPassword] = useState(true);

  const submitPasswordForm = async (e) => {
    e.preventDefault();
    if (user.password !== currPassword) {
      toast.error("Current password is wrong");
    }
    else {
      try {
        const updatedUser = {
          ...user,
          password: newPassword ? newPassword : user.password
        }
        const response = await fetch(basURl + `/${user.id}`, {
          method: "PUT",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(updatedUser)
        });
        const data = await response.json();
        localStorage.setItem("blog-user", JSON.stringify(data));
        toast.success("Password updated successfully");
        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("ERROR IN PASSWORD UPDATING::::", error);
      }
    }
  }

  return (
    <>
      <form onSubmit={submitPasswordForm}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-[#032833]  bg-indigo-900 p-8 px-12">
          <h2 className="text-lg font-semibold text-[#F1F2FF]">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%] text-white">
              <label htmlFor="oldPassword">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                onChange={(e) => {
                  setCurrPassword(e.target.value);
                }}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%] text-white">
              <label htmlFor="newPassword" >
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
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
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  )
}