import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustand/useAuthStore";

const WithPrivateRoute = ({ children }) => {
  const {token, user, logged_in} = useAuthStore();

  if (token && user._id && logged_in) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default WithPrivateRoute;
