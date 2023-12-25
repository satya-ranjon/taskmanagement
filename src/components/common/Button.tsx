import React, { ReactNode, ButtonHTMLAttributes } from "react";

export enum ButtonSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  size = ButtonSize.MD,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
      ${size === ButtonSize.SM && "px-2 py-1 text-base"}
      ${size === ButtonSize.MD && "px-3 py-2 text-base"}
      ${size === ButtonSize.LG && "px-5 py-2 text-lg "}
       bg-zinc-900 text-zinc-200 rounded-md font-semibold `}>
      {children}
    </button>
  );
};

export default Button;
