import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../ContextAPI/UserContext";
import { useContext } from "react";

export default function DeleteAccount() {

  const baseURl = "https://6724bca8c39fedae05b28c19.mockapi.io/users";
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try{
      await fetch(baseURl + `/${user.id}`,{
        method:"Delete"
      });
      localStorage.clear();
      toast.success("User deleted successfully");
      navigate("/");
    }catch(error){
      console.log("ERROR WHILE DELETING THE USER",error);
    }
  }

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 mt-10 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-[#ababcc]">
            Delete Account
          </h2>
          <div className="w-3/5 mx-auto text-[#bbbccb]">
            <p>Would you like to delete account?</p>
            <p className="text-[#94969f]">Deleting your account is permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit mx-auto cursor-pointer italic hover:text-red-400 text-pink-300"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  )
}