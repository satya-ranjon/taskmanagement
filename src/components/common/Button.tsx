import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

export enum ButtonSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

interface ButtonProps {
  children: ReactNode;
  url?: string;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  children,
  url,
  size = ButtonSize.MD,
}) => {
  return url ? (
    <Link
      to={url}
      className="px-3 py-2 bg-zinc-900 text-zinc-200 rounded-md font-semibold text-base">
      {children}
    </Link>
  ) : (
    <button
      className={`
      ${size === ButtonSize.MD && "px-3 text-base"}
      ${size === ButtonSize.LG && "px-5 text-lg"}
      py-2 bg-zinc-900 text-zinc-200 rounded-md font-semibold `}>
      {children}
    </button>
  );
};

export default Button;
