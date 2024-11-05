import { RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import IconBtn from "../Components/IconBtn";
import { UserContext } from "../ContextAPI/UserContext";
import { useContext } from "react";

export default function MyProfile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mb-8 md:mb-14 text-2xl md:text-3xl font-medium text-indigo-500 text-center md:text-left">
        My Profile
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between rounded-lg border border-indigo-200 bg-indigo-900 p-6 md:p-8 lg:px-12 space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row items-center gap-x-4 gap-y-4">
          <img
            src="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"
            alt={`profile-${user?.userName}`}
            className="aspect-square w-[60px] sm:w-[78px] rounded-full object-cover"
          />
          <div className="text-center sm:text-left space-y-1">
            <p className="text-base sm:text-lg font-semibold text-indigo-100">{user?.userName}</p>
            <p className="text-sm text-indigo-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => navigate("/dashboard/settings")}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-8 md:my-10 flex flex-col gap-y-6 rounded-lg border border-indigo-200 bg-indigo-900 p-6 md:p-8 lg:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-indigo-100">Personal Details</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-[40px] md:gap-[80px] max-w-full">
          <div className="flex flex-col gap-y-4 w-full sm:w-auto">
            <div>
              <p className="mb-1 text-sm text-indigo-400">Username</p>
              <p className="text-sm font-medium text-indigo-100">{user?.userName}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-indigo-400">Email</p>
              <p className="text-sm font-medium text-indigo-100">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 w-full sm:w-auto">
            <div>
              <p className="mb-1 text-sm text-indigo-400">Role</p>
              <p className="text-sm font-medium text-indigo-100">{user?.role}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-indigo-400">Address</p>
              <p className="text-sm font-medium text-indigo-100">
                {user?.address ? user.address : "Add address"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
