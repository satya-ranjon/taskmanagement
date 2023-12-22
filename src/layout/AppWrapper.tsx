import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppWrapper: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <div className=" font-inter">
      {pathname !== "/" && <Navbar />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppWrapper;
