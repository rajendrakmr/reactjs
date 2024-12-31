import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  // Check if the user is authenticated (e.g., by checking if a valid token exists)
  const isAuthenticated = localStorage.getItem("token"); // Replace this with your actual authentication check

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
