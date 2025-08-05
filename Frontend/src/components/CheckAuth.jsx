import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ children, protectedRoute }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (protectedRoute) {
    // If the route is protected and the user is NOT logged in, redirect.
    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } else {
    // If the route is public-only and the user IS logged in, redirect.
    if (token) {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  }

  // If no redirection is needed, render the page.
  return children;
}

export default CheckAuth;
