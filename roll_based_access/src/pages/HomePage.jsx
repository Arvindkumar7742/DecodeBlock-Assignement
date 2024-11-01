import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 flex flex-col items-center justify-center">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-800 mb-4">Welcome to Code Blogs!</h1>
        <p className="text-lg text-gray-700">Your daily dose of insightful articles and stories</p>
      </header>

      {/* Navigation Buttons */}
      <div className="flex space-x-6 mb-12">
        <Link to="/login">
          <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-300">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-md border border-indigo-600 hover:bg-indigo-50 transition duration-300">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Content Section */}
      <section className="max-w-3xl bg-white p-8 rounded-lg shadow-lg text-gray-700">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Explore, Learn, and Share</h2>
        <p className="mb-4">
          Dive into a world of knowledge! At My Blog, we bring together the thoughts and ideas of writers from all walks
          of life. Whether you’re here to read about the latest in technology, get tips for personal development, or
          just enjoy some creative writing, you’ll find something that resonates.
        </p>
        <p className="mb-4">
          Ready to join our community? Sign up today to start posting your own stories, interacting with other readers,
          and building a following. Already a member? Just log in to continue your journey!
        </p>
        <p className="text-center font-semibold text-indigo-600 mt-6">Happy reading!</p>
      </section>
    </div>
  );
}

export default HomePage;
