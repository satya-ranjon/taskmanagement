import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Button from "../../components/common/Button";
import AuthWrapper from "../../layout/AuthWrapper";
import useAuthentication from "../../hooks/useAuthentication";
import { User } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const { registration } = useAuthentication();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    registration(email, password).then((result: { user: User }) => {
      const user = result.user;
      console.log(user);
      toast.success("User Login Successful!");

      navigate(from, { replace: true });
    });
  };

  return (
    <AuthWrapper>
      <h1 className=" font-semibold text-3xl">Sign in</h1>
      <h2 className=" mt-3 max-w-xs">
        If you already have an account register You can
        <Link className=" text-primary font-semibold" to="/login">
          {" "}
          Login here
        </Link>
      </h2>
      <form
        onSubmit={handleSubmit}
        className=" mt-6 flex flex-col gap-5"
        action="">
        <div className=" flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <div className=" flex justify-start items-center gap-2 border-b-2">
            <AiOutlineMail />
            <input
              className=" placeholder:text-zinc-700 p-1 outline-none"
              type="name"
              name="name"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <div className=" flex justify-start items-center gap-2 border-b-2">
            <AiOutlineMail />
            <input
              className=" placeholder:text-zinc-700 p-1 outline-none"
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <div className=" flex justify-start items-center gap-2 border-b-2">
            <RiLockPasswordLine />
            <input
              className=" placeholder:text-zinc-700 p-1 outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
            />
          </div>
        </div>

        <Button>Sign Up</Button>
      </form>
    </AuthWrapper>
  );
};

export default Register;
