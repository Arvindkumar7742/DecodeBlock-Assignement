import React, { useReducer, useState } from "react";
import toast from 'react-hot-toast';

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const validateEmail = () => {
    var regex = /^([a-zA-z0-9\._]+)@([a-zA-z0-9]+)\.([a-z]+)(\.([a-z]+))?$/
    if (regex.test(email)) {
      return true;
    }
    else {
      return false;
    }
  }

 async function signUpWithUserData() {
    try{
      const userData ={
        userName,
        password,
        email,
        address,
        role
      }
      const response = await fetch("/api/user",{
        method:"POST",
        body: JSON.stringify(userData),
      });
      const data =await response.json();
      console.log("Data from MockAPI:::",data);
    }catch(error){
      console.log("ERROR WHILE CALLING SIGN UP MOCKING API...",error);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (validateEmail) {
      signUpWithUserData();
    }
    else {
      toast.error("Enter a valid Email");
      return;
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-200">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome to Code Blogs!</h2>
        <p className="text-center text-gray-500 mb-8">Create an account to start your journey</p>

        <form onSubmit={submitHandler}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="" disabled selected>
                Choose a role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              rows="3"
              value={address}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
