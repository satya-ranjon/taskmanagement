import React from "react";
import { images } from "../../constant";

const Logo: React.FC = () => {
  return (
    <div className=" flex justify-start items-center gap-3">
      <img
        src={images.Logo}
        alt="logo"
        className=" w-10 h-10 lg:w-11 lg:h-11"
      />
      <span className="text-zinc-950 font-bold text-2xl lg:text-3xl">
        Protask
      </span>
    </div>
  );
};

export default Logo;
