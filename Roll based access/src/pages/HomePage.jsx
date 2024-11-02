import React from "react";
import { Link } from "react-router-dom";

function HomePage() {

  const user = JSON.parse(localStorage.getItem("blog-user"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 flex flex-col items-center justify-center">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-800 mb-4">Welcome to Code Blogs!</h1>
        <p className="text-lg text-gray-700">Your daily dose of insightful articles and stories</p>
      </header>

      {/* Navigation Buttons */}
      {
        user ? <div className="text-2xl font-semibold text-indigo-800 bg-indigo-300 py-3 px-5 rounded-lg shadow-md inline-block">
          Welcome, <span className="text-indigo-600">{user.userName}</span>!
        </div>
          : <div className="flex space-x-6 mb-6">
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
      }

      {/* Content Section with Browse Blogs Button */}
      <section className="max-w-3xl bg-white p-8 rounded-lg shadow-lg text-gray-700">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Explore, Learn, and Share</h2>
        <p className="mb-4">
          Dive into a world of knowledge! At Code Blogs, we bring together the thoughts and ideas of writers from all walks
          of life. Whether you’re here to read about the latest in technology, get tips for personal development, or
          just enjoy some creative writing, you’ll find something that resonates.
        </p>
        <p className="mb-6">
          Ready to explore more? Discover insightful articles across various domains by heading over to our blogs section.
        </p>

        {/* Browse Blogs Button */}
        <div className="text-center mt-6">
          <Link to="/blogs">
            <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300">
              Browse Blogs
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
