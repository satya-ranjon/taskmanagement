import React, { useState } from "react";
import Container from "../common/Container";
import Logo from "../common/Logo";
import { NavLink } from "react-router-dom";
import Button from "../common/Button";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const menu = [
  { label: "Home", link: "/" },
  { label: "Features", link: "/features" },
  { label: "Pricing", link: "/pricing" },
  { label: "Contact", link: "/contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="py-8 font-medium text-zinc-600">
      <Container>
        <div className=" flex justify-between lg:justify-start items-center gap-20">
          <Logo />

          <div className=" relative lg:hidden">
            {/* Menu Controller  */}
            {isOpen ? (
              <IoMdClose
                onClick={() => setIsOpen(false)}
                className="text-4xl"
              />
            ) : (
              <IoMdMenu onClick={() => setIsOpen(true)} className="text-4xl" />
            )}
            {/* Mobile & Tablet menu  */}
            {isOpen && (
              <div className=" absolute w-72  bg-red-50 right-0 top-12 rounded-sm">
                <div className=" w-full flex flex-col  justify-start gap-4 items-center py-10 ">
                  {menu.map((item) => (
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                      to={item.link}
                      key={item.link}>
                      {item.label}
                    </NavLink>
                  ))}
                  <NavLink to="/login"> Login</NavLink>
                  <Button> Let’s Explore</Button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop menu  */}
          <div className="w-full hidden lg:flex justify-between items-center text-lg ">
            <div className="flex justify-start gap-8 items-center  ">
              {menu.map((item) => (
                <NavLink
                  className={({ isActive }) => (isActive ? "text-primary" : "")}
                  to={item.link}
                  key={item.link}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className=" flex justify-start gap-8 items-center">
              <NavLink to="/login"> Login</NavLink>
              <Button> Let’s Explore</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
