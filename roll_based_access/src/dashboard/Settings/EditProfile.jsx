import { useNavigate } from "react-router-dom"
import IconBtn from "../../Components/IconBtn"

export default function EditProfile() {
  const user = JSON.parse(localStorage.getItem("blog-user"));
  const navigate = useNavigate()

  const submitProfileForm = async (data) => {
   //submit kerna hai
  }
  return (
    <>
      <form onSubmit={submitProfileForm} className="text-[#f2f2f5]">
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-[#032833] bg-[#5e94f0] p-8 px-12">
          <h2 className="text-lg font-semibold text-[#F1F2FF]">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                className="form-style"
                defaultValue={user?.userName}
              />
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="form-style"
                defaultValue={user?.email}
              />
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="address" className="lable-style">
                Address
              </label>
              <textarea
                id="address"
                rows="3"
                placeholder="Enter your address"
                className="form-style"
                defaultValue={user?.address}
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