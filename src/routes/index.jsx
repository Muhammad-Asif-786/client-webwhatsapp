import React from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App.jsx";
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import OtpVerification from '../pages/OtpVerification.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import ConversationPage from '../pages/ConversationPage.jsx';


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                index: true,
                // path: ""  //(isky zariay bydefault login screen py jaty hn) kam to yabhi theek kry ga lakin ES6 mn ya index: true, recomended hy
                element: <Navigate to="/login" />
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "home",
                element: <Home/>
            },
             {
                path: "conversation",   
                element: <ConversationPage />
            },
            {
                path: "forgot_password",
                element: <ForgotPassword/>
            },
            {
                path: "verification-otp",
                element: <OtpVerification/>
            },
            {
                path: "reset-password",
                element: <ResetPassword/>
            },
            {
                path: "profile",
                element: <ProfilePage/>
            },
           
            
        ]
    }
])

export default router