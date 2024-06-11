import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminAuth = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();
  const isAdmin = userRole === "ROLE_ADMIN_PADRE";

  if (!isAdmin) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default AdminAuth;
