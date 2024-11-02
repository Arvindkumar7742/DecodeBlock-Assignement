import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaLongArrowAltRight, FaHeart } from "react-icons/fa";

export const BlogCard = ({ blog }) => {

    const basURl = "https://6724bca8c39fedae05b28c19.mockapi.io/posts";
    const user = JSON.parse(localStorage.getItem("blog-user"));
    const [post_likes, setPostLikes] = useState(blog.likes); // State to hold the number of likes
    const [likedFlag,setLikedFlag] = useState(false);

    async function likePost() {
        try{
        
            const updatedBlog = {
              ...blog,
              likes:post_likes
            }
            const response = await fetch(basURl+ `/${blog.id}`,{
              method:"PUT",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(updatedBlog)
            });
           }catch(error){
            console.log("ERROR IN UPDATING Like OF THE Blog::::",error);
           }
    }

    const handleLike = () => {
        if(!post_likes.includes(user.id)){
            post_likes.push(user.id);
            setPostLikes(post_likes);
            toast.success("Blog liked");
            setLikedFlag(true);
            likePost();
        }
        return;
    };

    useEffect(()=>{
        if(post_likes.includes(user.id)){
            setLikedFlag(true);
        }
        else{
            setLikedFlag(false);
        }
    },[]);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-5">
                <h2 className="text-xl font-semibold text-indigo-800 mb-3">
                    {blog.title}
                </h2>
                <p className="text-gray-600 mb-5">{blog.description}</p>
                <div className="flex items-center mb-4">
                    <button 
                        onClick={handleLike} 
                        className="flex items-center text-indigo-500 font-medium hover:text-indigo-700 transition-colors mr-3"
                    >
                        <FaHeart className={`mr-1 ${likedFlag && "text-indigo-900 text-2xl"} transition-all duration-100`}/> {post_likes.length}
                    </button>
                    <button className="text-indigo-500 ml-5 font-medium hover:text-indigo-700 transition-colors">
                        Read More <FaLongArrowAltRight className='inline ml-2' />
                    </button>
                </div>
            </div>
        </div>
    );
}
