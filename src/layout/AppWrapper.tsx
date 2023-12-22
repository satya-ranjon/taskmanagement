import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppWrapper: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <div className=" font-inter">
      {pathname !== "/" && <Navbar />}
      <Outlet />
    </div>
  );
};

export default AppWrapper;
