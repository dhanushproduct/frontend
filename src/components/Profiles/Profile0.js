import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import {auth} from "../../firebase.config";

import axios from "axios";
import apiUrl from "../../apiConfig";
export default function Profile0() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [viewotp, setviewotp] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [phone, setphone] = useState("");
  // const [ setviewotp] = useContext(Otpcontext);
  const inputRefs = useRef(
    Array(6)
      .fill(null)
      .map(() => React.createRef())
  );
  const token = localStorage.getItem("token")


  function onSignup() {
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
      }
  }
  
  

  function onOTPVerify() {
    let flag = 1;
    for (let i = 0; i < otpValues.length; i++) {
      if (otpValues[i] === "") {
        toast("Enter correct OTP");
        flag = 0;
        break;
      }
    }
    if (flag == 0) {
      return;
    }
    
    const writtenOtp = otpValues.join("");
    window.confirmationResult
      .confirm(writtenOtp)
      .then(async (res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  const verifyOtp = async () => {
    let flag = 1;
    for (let i = 0; i < otpValues.length; i++) {
      if (otpValues[i] === "") {
        toast("Enter correct OTP");
        flag = 0;
        break;
      }
    }
    if (flag == 0) {
      return;
    }

    const writtenOtp = otpValues.join("");
    // toast.success(writtenOtp)
    // verifyOTP(data, writtenOtp);
    const reqbody = {
      phone: phone
    }
    console.log(reqbody)
    try{
      const response = await axios.put(apiUrl.profile.sendsms + token,reqbody);
      //console.log(response)
      if(response.status == 200){
        // //console.log(response.body);
        navigate(`/profile/page1/${token}`)
      }
    }catch(err){
      //console.log(err);
    }

  };

  const handleOtpChange = (index, value, isBackspace) => {
    if (isBackspace && index > 0 && value === "") {
      inputRefs.current[index - 1].current.focus();
    } else {
      const limitedValue = value.slice(0, 1);

      setOtpValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = limitedValue;
        return newValues;
      });

      if (index < inputRefs.current.length - 1 && limitedValue !== "") {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };
  const submitform = (data) => {
    const ph = data.extension+data.phone
    setphone(ph);
    setviewotp(true);
    startTimerResend();
    onSignup();

    // giving empty at console 
    console.log(phone);
  };
  const handlepaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    const otpArray = pastedData.split("").slice(0, 6);

    setOtpValues((prevValues) => {
      const newValues = [...prevValues];
      otpArray.forEach((value, index) => {
        if (inputRefs.current[index]) {
          newValues[index] = value;
        }
      });

      return newValues;
    });
    if (inputRefs.current[inputRefs.current.length - 1]) {
      inputRefs.current[inputRefs.current.length - 1].current.focus();
    }
  };
  const [timerotp, setTimerotp] = useState(60);
  const [disabled, setDisabled] = useState(true);

  const startTimerResend = () => {
    setTimerotp(60);

    const intervalId = setInterval(() => {
      setTimerotp((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      setDisabled(false);
    }, 60000);
  };

  useEffect(() => {
    if (timerotp === 0) {
      setDisabled(false);
    }
  }, [timerotp]);

  const handleResendClick = () => {
    setDisabled(true); // Add this line to disable the button
    startTimerResend();
  };
  useEffect(() => {
    if (viewotp) {
      // If viewotp is true, focus on the first input field
      inputRefs.current[0].current.focus();
    }
  }, [viewotp]);

  return (
    <div>
      <div className=" h-1 w-full flex">
        <div className="h-full bg-blue-900 w-[8%]"></div>
        <div className="h-full bg-white w-[92%]"></div>
      </div>
      <div id="recaptcha-container"></div>
      <div className="m-4 relative">
        <div className="py-3 text-2xl font-bold font-sans">
          Verify your phone number
        </div>
        <br />
        <br />
        <form onSubmit={handleSubmit(submitform)}>
          <label htmlFor="firstname" className=" font-semibold">
            Enter Phone number <span className=" text-red-500">*</span>
          </label>
          <div className="flex gap-2  w-full items-center">
            <select
              className="lg:w-[20%] p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
              name="extension"
              {...register("extension")}
            >
              <option value="+1">+1</option>
              <option value="+91">+91</option>
              {/* Add more options as needed */}
            </select>
            <input
              type="number"
              className="w-[50%] p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
              name="firstname"
              required
              {...register("phone")}
            />

            <button
              type="submit"
              className=" text-blue-600 font-semibold hover:text-blue-800 "
            >
              send otp
            </button>
          </div>
        </form>
        <br />
        {viewotp && (
          <form onPaste={handlepaste} className="text-center ">
            <div className=" font-semibold">Enter OTP:</div>
            <div className="flex justify-center p-4 m-4">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  name={`otp-${index}`}
                  id={`otp-${index}`}
                  className="border-b-2 m-2 md:m-4 w-8 text-center"
                  required
                  value={value}
                  onChange={(e) => {
                    handleOtpChange(index, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && value === "") {
                      handleOtpChange(index, "", true);
                    }
                  }}
                  ref={inputRefs.current[index]}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onOTPVerify}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl md:w-[40%] w-[100%] my-4 md:my-0"
            >
              Verify
            </button>
            <div className="py-4 my-2 text-center w-full">
              Not received your code?{" "}
              <button
                className={`font-bold  ${
                  disabled ? "text-gray-500" : "text-blue-500"
                }`}
                onClick={handleResendClick}
                disabled={disabled}
              >
                Resend code {disabled ? `(${timerotp}s)` : ""}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
