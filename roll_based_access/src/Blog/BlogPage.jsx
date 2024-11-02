import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from './BlogCard';
import { FaArrowLeft } from 'react-icons/fa';

export const BlogPage = () => {
    const navigate = useNavigate();
    const [blogsData, setBlogsData] = useState(null);

    const baseURL = "https://6724bca8c39fedae05b28c19.mockapi.io/posts";

    useEffect(() => {
        async function fetchBlogsData() {
            try {
                const response = await fetch(baseURL);
                const data = await response.json();
                setBlogsData(data);
            } catch (error) {
                console.log("ERROR IN FETCHING THE BLOG DATA::::", error);
                toast.error("Error in fetching the blog data");
            }
        }
        fetchBlogsData();
    }, []);

    const user = JSON.parse(localStorage.getItem("blog-user"));
    if (!user) {
        navigate("/login");
        return;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 py-10 px-5">
            {/* Back Button */}
            {
                user ? <button
                    onClick={() => navigate("/dashboard/my-profile")}
                    className="flex items-center text-indigo-600 font-semibold mb-6 hover:text-indigo-800 transition-colors"
                >
                    <FaArrowLeft className="mr-2" /> Back to Profile
                </button> : <button
                    onClick={() => navigate("/")}
                    className="flex items-center text-indigo-600 font-semibold mb-6 hover:text-indigo-800 transition-colors"
                >
                    <FaArrowLeft className="mr-2" /> Back to Home
                </button>
            }

            {/* Header */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-8">
                Welcome to Code Blogs
            </h1>
            <p className="text-center text-lg md:text-xl text-indigo-600 mb-10">
                Discover the latest insights in AI, ML, and Technology.
            </p>

            {/* Blog Cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {blogsData && blogsData.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}
