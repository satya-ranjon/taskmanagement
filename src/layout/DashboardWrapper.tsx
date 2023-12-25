import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import useAuthentication from "../hooks/useAuthentication";
import Loader from "../components/common/Loader";

const DashboardWrapper: React.FC = () => {
  const { user, loading } = useAuthentication();
  const { pathname } = useLocation();

  if (loading) return <Loader />;

  if (!user?.email) {
    return <Navigate state={pathname} to="/login" />;
  }
  return (
    <div className="flex flex-col md:flex-row justify-start items-start">
      <div className=" w-full md:w-[100px] lg:w-[150px] md:h-screen border-r-2 border-r-red-100 ">
        <DashboardNavbar />
      </div>
      <div className=" w-full p-2 xl:p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardWrapper;
