import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookieService";

const AuthRoute = ({ children }) => { 
  const isAuthenticated =  !!getCookie('access_token'); 
  return isAuthenticated ? children : <Navigate to="/" />;
  // return isAuthenticated ? children : children;
};

export default AuthRoute;
