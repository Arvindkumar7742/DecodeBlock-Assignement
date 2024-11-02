import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from './BlogCard';

export const BlogPage = () => {

    const navigate = useNavigate();
    const [blogsData, setBlogsData] = useState(null);

    const basURl = "https://6724bca8c39fedae05b28c19.mockapi.io/posts";

    useEffect(() => {
        async function fetchBlogsData() {
            try {
                const response = await fetch(basURl);
                const data = await response.json();
                console.log("data of blogs:::",data);
                setBlogsData(data);
            } catch (error) {
                console.log("ERROR IN FETCHING THE BLOG DATA::::", error);
                toast.error("error in fetching the blog data");
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-8">
                Welcome to Code Blogs
            </h1>
            <p className="text-center text-lg md:text-xl text-indigo-600 mb-10">
                Discover the latest insights in AI, ML, and Technology.
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {blogsData && blogsData.map((blog) => (
                    <BlogCard key={blog.id} title={blog.title} description={blog.description} imageUrl={blog.imageUrl}/>
                ))}
            </div>
        </div>
    )
}
