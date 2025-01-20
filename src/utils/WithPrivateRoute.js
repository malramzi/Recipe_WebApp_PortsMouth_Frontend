import React from "react";
import { Navigate } from "react-router-dom";

const WithPrivateRoute = ({ children }) => {
  const token = true;

  if (token) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default WithPrivateRoute;
