import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { logincontext } from "../contexts/Logincontext";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { PopoverComponent } from "./Popover";
import apiUrl from "../apiConfig";

export default function ForgotPasswordForm() {
  const [
    currentuser,
    loginerror,
    UserloginStatus,
    Loginuser,
    Signupuser,
    VerifyOTP,
    VerifyForgotPasswordOTP,
    Signupadmin,
    Logoutuser,
  ] = useContext(logincontext);
  const [viewmailotp, setviewotp] = useState(false);
  const [viewnewpassword, setviewnewpassword] = useState(false);
  const [captcha, setcaptcha] = useState(undefined);
  const [data, setdata] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [timer, setTimer] = useState(60);
  const [disabled, setDisabled] = useState(true);

  const startTimer = () => {
    setDisabled(true);
    setTimer(60);

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      setDisabled(false);
    }, 60000);
  };
  // useEffect(() => {
  //   startTimer(); // Start the timer when the component mounts
  // }, []);
  useEffect(() => {
    if (timer === 0) {
      setDisabled(false);
    }
  }, [timer]);

  const handleResendClick = async () => {
    const resdata = await ForgotPassword(data);
    startTimer();
  };
  const [showpassword, setshowpassword] = useState("password");
  const showpass = () => {
    const type = showpassword === "password" ? "text" : "password";
    setshowpassword(type);
  };

  const [loading, setLoading] = useState(false); // State to track loading

  const ForgotPassword = async (userobj) => {
    //console.log(userobj);

    // request otp
    try {
      const response = await axios.post(
        apiUrl.forgotpassword.sendcode,
        userobj
      );

      if (response.status === 200) {
        console.log(response.data);
        setcaptcha(response.data.captcha);
        toast.success("Captcha successfully sent");
        return response.data;
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          toast.warn("Account with this mail id does not exist");
        } else {
          toast(err.response.data.message);
        }
      } else {
        toast.error("Unexpected Error");
      }
    }
  };

  const submitform = async (data) => {
    if (data.newpassword !== data.cnewpassword) {
      toast.error("check your password");
      setviewotp(false);
      return;
    }
    setLoading(true);
    console.log(data);
    setdata(data);
    const keys = Object.keys(data);
    console.log(keys.length);
    if (keys.length < 4) {
      if (viewmailotp) {
        if (captcha == data.captcha) {
          setviewnewpassword(!viewnewpassword);
          toast.success("Captcha verified");
          setviewotp(!viewmailotp)
        } else {
          toast.warn("Enter Correct Captcha");
        }
      }
      if (!viewmailotp) {
        const resdata = await ForgotPassword(data);
        if (resdata) {
          startTimer();
          setviewotp(!viewmailotp);
        }
      }
    } else {
      if (data.newpassword != data.cnewpassword) {
        toast.warn("Enter Valid password");
      } else {
        try {
          const userdata = {
            email: data.email,
            newpassword: data.newpassword,
          };
          const response = await axios.post(
            apiUrl.forgotpassword.changepassword,
            userdata
          );

          if (response.status === 200) {
            toast.success("Password Successfully Changed");
            navigate("/login");
          }
        } catch (err) {
          if (err.response) {
            if (err.response.status === 401) {
              toast.warn("Account with this mail id does not exist");
            } else {
              toast(err.response.data.message);
            }
          } else {
            toast.error("Unexpected Error");
          }
        }
      }
    }
    setLoading(false);
  };

  const [first, setfirst] = useState(true);

  return (
    <div className="">
      <h1 className="text-center py-3 text-2xl font-bold font-sans">
        Forgot Password
      </h1>
      <h4 className="px-4 text-sm ">
        We’ll send a verification code to this email if it matches an existing
        Aspireup account.
      </h4>

      <form onSubmit={handleSubmit(submitform)} className="p-4">
        <input
          type="email"
          disabled={!viewmailotp && viewnewpassword}
          placeholder="Email"
          className="w-full p-2 focus:outline-none border-b-4 border-2 text-gray-800 rounded-md my-2"
          name="Email"
          required
          {...register("email")}
        />
        {viewmailotp && (
          <input
            type="text"
            placeholder="Enter Captcha Here"
            className="w-full p-2 focus:outline-none border-b-4 border-2 text-gray-800 rounded-md my-2"
            name="Captcha"
            required
            {...register("captcha")}
          />
        )}
        {viewnewpassword && (
          <div>
            <div
              className={`w-full py-0.5 pr-2 items-center border-b-4 border-2 text-gray-800 rounded-md my-2 flex justify-between ${
                errors.newpassword ? "border-red-500" : ""
              }`}
            >
              <input
                type={showpassword}
                placeholder="Password"
                name="newpassword"
                className="h-full p-2 focus:outline-none w-[90%]"
                required
                {...register("newpassword", {
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
            {errors.newpassword && (
              <p className="text-red-500">{errors.newpassword.message}</p>
            )}
            <input
              type={showpassword}
              placeholder="Confirm Password"
              className="w-full p-2 focus:outline-none border-b-4 border-2 text-gray-800 rounded-md my-2"
              name="cnewpassword"
              required
              {...register("cnewpassword")}
            />
            <div className="py-2">
              <input
                type="checkbox"
                name="show"
                id="show"
                onChange={showpass}
              />
              <label
                htmlFor="show"
                className="text-sm text-justify hover:cursor-pointer  px-2"
              >
                {" "}
                Show password
              </label>
            </div>
          </div>
        )}
        <div className="mt-2 w-full flex flex-row-reverse justify-between">
          {/* Render spinner if loading, otherwise render login button */}
          {loading ? (
            <FaSpinner className="animate-spin text-blue-800 mr-2" />
          ) : (
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 duration-300 text-white font-bold py-2 px-4 rounded-xl"
            >
              {viewnewpassword
                ? "Confirm"
                : viewmailotp
                ? "Verify Captcha"
                : "Send Verification Email"}
            </button>
          )}
          {!viewnewpassword && viewmailotp && (
            <div className="w-[60%]">
              Not received your code?{" "}
              <button
                className={`font-bold  ${
                  disabled ? "text-gray-500" : "text-blue-500"
                }`}
                onClick={handleResendClick}
                disabled={disabled}
              >
                Resend code {disabled ? `(${timer}s)` : ""}
              </button>
            </div>
          )}
        </div>
      </form>
    
    </div>
  );
}
