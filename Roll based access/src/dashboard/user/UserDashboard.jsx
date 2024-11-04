import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLike } from "react-icons/ai";
import { UserContext } from '../../ContextAPI/UserContext';

export const UserDashboard = () => {

  const baseURl = "https://6724bca8c39fedae05b28c19.mockapi.io/posts";
  const { user } = useContext(UserContext);
  const [recentActivities, setRecentActivities] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(baseURl);
      const blogs = await response.json();
      console.log("the data of all blogs::", blogs)
      const newData = blogs.filter((blog) => blog.likes.includes(user.id));
      setRecentActivities(newData);

    } catch (error) {
      console.log("ERROR WHILE FETCHING THE POST FOR RECENT ACTIVITY::", error);
      toast.error("Error while fetching the Blog data");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-indigo-500 rounded-lg text-[#F1F2FF] p-8 shadow-lg">
      <h1 className="text-3xl font-semibold text-[#F1F2FF] mb-6 border-b-2 border-indigo-700 pb-2">
        Recent Activities
      </h1>
      <div className="space-y-4">
        {recentActivities.length==0 ? <div className='text-center text-2xl'>No Recent Activity</div>
          : recentActivities.map((activity, index) => (
            <div
              key={index}
              className="p-4 bg-indigo-800 rounded-md flex items-center gap-4 hover:bg-[#2C333F] transition-all duration-200"
            >
              {activity.likes.length > 0 && (
                <div className="flex items-center gap-2">
                  <AiOutlineLike className="text-indigo-400 text-lg" />
                  <span className="text-[#F1F2FF]">
                    You liked this blog - <span className="font-medium">"{activity.title}"</span>
                  </span>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
