import React from 'react'
import { useNavigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("blog-user"));

    if (user) {
        return children;
    }
    else {
        navigate("/login");
        return;
    }
}
