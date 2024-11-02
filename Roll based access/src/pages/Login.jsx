import React, { useState } from "react";
import toast from "react-hot-toast";
import { json, useNavigate } from "react-router-dom";

function Login() {
  const basURl = "https://6724bca8c39fedae05b28c19.mockapi.io/users";
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("blog-user"));

  const validateEmail = () => {
    var regex = /^([a-zA-z0-9\._]+)@([a-zA-z0-9]+)\.([a-z]+)(\.([a-z]+))?$/
    if (regex.test(email)) {
      return true;
    }
    else {
      return false;
    }
  }

  async function checkUser() {
    try {
      const response = await fetch(basURl);
      const userData = await response.json();
      const user = userData.find((user)=>user.email==email);

      if(user){
        if(user.password!=password){
          return {exist:false,message:"password not match"}
        }
        else{
          return {exist:true,user:user};
        }
      }
      else{
        return {exist:false,message:"user does not exist"};
      }
    }
    catch (error) {
      console.log("ERROR WHILE FETCHING ALL THE USER DATA:::", error);
      return {exist:false,message:"user does not exist"};
    }
  }


  async function submitHandler(e){
    e.preventDefault();
    if (validateEmail) {
      const flag = await checkUser();
      if (flag.exist) {
        toast.success("logged in successfully");
        localStorage.setItem("blog-user",JSON.stringify(flag.user));
        navigate(`/dashboard/my-profile`);
      }
      else {
        toast.error(flag.message);
      }
      setEmail("");
      setPassword("");
      return;
    }
    else {
      toast.error("Enter a valid Email");
      return;
    }
  }

  if(user){
    navigate("/dashboard/my-profile");
    return;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-200">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login to Code Blogs</h2>
        <p className="text-center text-gray-500 mb-8">Welcome back! Please log in to continue</p>

        <form onSubmit={submitHandler}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
