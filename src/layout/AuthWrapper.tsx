import React, { ReactNode } from "react";
import { images } from "../constant";
import SocialAuth from "../components/auth/SocialAuth";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2">
      <div className=" col-span-1 hidden md:flex justify-center items-center bg-violet-50">
        <img src={images.auth3} alt="auth" />
      </div>
      <div className=" col-span-1  ">
        <div className=" p-5 lg:p-24 xl:p-32 xl:pr-64">
          {children}
          <SocialAuth />
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
