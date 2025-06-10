import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({  children }) => {
  const userRole = localStorage.getItem('userRole'); // Get user role from localStorage

  if (!userRole) {
    return <Navigate to="/login" />; // Redirect to login page if no userRole is found
  }

  // If userRole is "admin", they are allowed to see any route
  if (userRole === 'admin') {
    return children;
  }

  // If userRole is "content", check if the path is /task or /task/detail
  if (userRole === 'content-head') {

    
    if ( window.location.pathname==="/") {
      return <Navigate to="/task" />; 
    }
    return children;
  }



  // If the user doesn't have the proper role, redirect to home page or an error page
  return <Navigate to="/" />;
};
