import React, { useContext, useState } from "react";
import { set, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { logincontext } from "../contexts/Logincontext";
import MailOtp from "./MailOtp";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PopoverComponent } from "./Popover";

export default function Signupform() {
  const [
    currentuser,
    loginerror,
    UserloginStatus,
    Loginuser,
    Signupuser,
    VerifyOTP,
    Signupadmin,
    Logoutuser,
  ] = useContext(logincontext);
  const [viewmailotp, setviewotp] = useState(false);
  const [data, setdata] = useState();
  const [showpassword, setshowpassword] = useState("password");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const showpass = () => {
    const type = showpassword === "password" ? "text" : "password";
    setshowpassword(type);
  };
  const submitform = (data) => {
    if (data.password !== data.cpassword) {
      toast.error("check your password");
      setviewotp(false);
      return;
    }
    // console.log(data);
    const { cpassword, ...userdata } = data;
    userdata["phone"] = " ";
    console.log(userdata);
    setdata(userdata);
    const resdata = Signupuser(userdata);

    setviewotp(!viewmailotp);

    // toast.success("OTP successfully sent");
  };

  return (
    <div>
      {" "}
      {viewmailotp && (
        <MailOtp
          viewmailotp={viewmailotp}
          setviewotp={setviewotp}
          Signupuser={Signupuser}
          data={data}
          setdata={setdata}
          verifyOTP={VerifyOTP}
        />
      )}
      <h1 className="text-center py-3 text-2xl font-bold font-sans">
        We Bring Job Offers to You
      </h1>
      <p className="text-center ">
        Join thousands of people who’ve found their dream job using aspireup.
      </p>
      <br />
      <hr />
      <br />
      <form onSubmit={handleSubmit(submitform)}>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2  focus:outline-none border-b-4 border-2 text-gray-800 rounded-md my-2"
          name="name"
          required
          {...register("name")}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2  focus:outline-none border-b-4 border-2 text-gray-800 rounded-md my-2"
          name="Email"
          required
          {...register("email")}
        />
        {/* <input
          type={showpassword}
          placeholder="Password"
          className="w-full p-2  border-b-4 border-2 text-gray-800 rounded-md my-2"
          name="password"
          required
          {...register("password")}
        /> */}
        {/* to insert i button to insert the rules of password */}
        <div
          className={`w-full py-0.5 pr-2 items-center border-b-4 border-2 text-gray-800 rounded-md my-2 flex justify-between ${
            errors.password ? "border-red-500" : ""
          }`}
        >
          <input
            type={showpassword}
            placeholder="Password"
            name="password"
            className="h-full p-2 focus:outline-none w-[90%]"
            required
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                message: "Invalid password format",
              },
            })}
          />
          <PopoverComponent />
        </div>

        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          type={showpassword}
          placeholder="Confirm Password"
          className="w-full p-2  focus:outline-none border-b-4 border-2 text-gray-800 rounded-md my-2"
          name="cpassword"
          required
          {...register("cpassword")}
        />
        <div className="py-2">
          <input type="checkbox" name="show" id="show" onChange={showpass} />
          <label
            htmlFor="show"
            className="text-sm text-justify hover:cursor-pointer  px-2"
          >
            {" "}
            Show password
          </label>
        </div>
        <div className="py-3 hover:cursor-pointer">
          <input type="checkbox" name="terms" id="terms" required />
          <label
            htmlFor="terms"
            className="text-sm text-justify hover:cursor-pointer  px-2"
          >
            By signing up you agree to aspireup's Terms of Service and Privacy
            Policy, which outline your rights and obligations with respect to
            your use of the Service and processing of your data.
          </label>
        </div>
        <div className="py-3 hover:cursor-pointer">
          <input type="checkbox" name="conditions" id="conditions" required />
          <label
            htmlFor="conditions"
            className="text-sm text-justify hover:cursor-pointer  px-2"
          >
            You agree to receive subsequent email and third-party
            communications, which you may opt out of, or unsubscribe from, at
            any time.
          </label>
        </div>

        <div className="p-3 text-sm">
          aspireup is committed to protecting your data privacy. Permissions are
          part of our continuing compliance efforts.
        </div>
        <div className="p-3 text-sm">
          We will provide reasonable accommodations with regard to use of this
          site. If you require an accommodation while using our site, please
          contact{" "}
          <a href="#" className="text-blue-600 underline">
            support@aspireup.com
          </a>{" "}
          to request assistance.
        </div>
        <br />
        <hr />
        <br />
        <div className="mt-6 flex md:flex-row flex-col justify-between px-4">
          <div className=" text-sm">
            Already have an account? <br />
            <NavLink
              to="/login"
              onClick={() => {
                window.scroll(0, 0);
              }}
              className=" text-blue-800 hover:text-blue-900 font-semibold"
            >
              {" "}
              Sign in.{" "}
            </NavLink>
          </div>
          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl md:w-[30%] w-[100%] my-4 md:my-0"
          >
            Register
          </button>
        </div>
        <br />
      </form>
    </div>
  );
}
