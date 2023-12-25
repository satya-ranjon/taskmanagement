import React from "react";
import { LuListTodo } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { images } from "../../constant";
import useAuthentication from "../../hooks/useAuthentication";
import { SlEvent } from "react-icons/sl";

const DashboardNavbar: React.FC = () => {
  const { logoutUser, user } = useAuthentication();
  const handleLogout = () => {
    console.log("Logout");
    logoutUser();
  };
  return (
    <div className="flex md:flex-col items-center justify-between w-full py-2 px-2 md:px-0 md:py-10 md:h-full ">
      <div className="flex md:flex-col items-center gap-10">
        <NavLink to="/">
          <img
            src={images.Logo}
            alt="Logo"
            className=" w-9 h-9 md:w-12  md:h-12"
          />
        </NavLink>
        <NavLink
          to="/dashboard/todo"
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-zinc-600"
          }>
          <LuListTodo className="text-4xl" />
        </NavLink>
        <NavLink
          to="/dashboard/event "
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-zinc-600"
          }>
          <SlEvent className="text-3xl" />
        </NavLink>
      </div>
      <div className="flex md:flex-col items-center gap-5">
        <NavLink to="/dashboard/profile">
          <img
            src={user.photoURL}
            alt="Logo"
            className=" w-9 h-9 md:w-12 md:h-12 rounded-full"
          />
        </NavLink>
        <button
          onClick={handleLogout}
          className=" border-[1px] p-2 md:p-3 rounded-full bg-red-50 border-red-400 text-red-500">
          <CiLogout className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
