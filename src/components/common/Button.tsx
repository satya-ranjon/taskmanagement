import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  url?: string;
}

const Button: React.FC<ButtonProps> = ({ children, url }) => {
  return url ? (
    <Link
      to={url}
      className="px-3 py-2 bg-zinc-900 text-zinc-200 rounded-md font-semibold text-base">
      {children}
    </Link>
  ) : (
    <button className=" px-3 py-2 bg-zinc-900 text-zinc-200 rounded-md font-semibold text-base">
      {children}
    </button>
  );
};

export default Button;
