import React from "react";
import useAuthentication from "../../../hooks/useAuthentication";

const Profile: React.FC = () => {
  const { user } = useAuthentication();
  return (
    <div className=" flex flex-col gap-5 text-2xl">
      <img src={user.photoURL} alt="logo" className="w-44 h-44 rounded-full" />
      <h1>Name: {user.displayName}</h1>
      <h1>Email: {user.email}</h1>
    </div>
  );
};

export default Profile;
