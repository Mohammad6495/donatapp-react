import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext/AuthContext";

const PrivateOutlet = () => {
  const { userToken } = useAuthContext();
  /////////
  return userToken ? <Outlet /> : <Navigate to="/register" />;
};

export default PrivateOutlet;
