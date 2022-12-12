import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRoutes = () => {
  const { currentUser } = useAuth();

  if (currentUser.pending) {
    return <h1>Waiting</h1>;
  }
  if (!currentUser.isSignedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
