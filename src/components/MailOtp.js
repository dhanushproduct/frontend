import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";

export default function MailOtp({
  viewmailotp,
  setviewotp,
  Signupuser,
  data,
  otp,
  setdata,
  verifyOTP,
}) {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  useEffect(() => {
    // console.log("working");
  }, [showForgotPassword]);
  // const [ setviewotp] = useContext(Otpcontext);
  const inputRefs = useRef(
    Array(6)
      .fill(null)
      .map(() => React.createRef())
  );

  const verifyOtp = () => {
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
    console.log(Object.keys(data).length);
    if (Object.keys(data).length == 1) {
      if (verifyOTP(data, writtenOtp) == 1) {
        closemodal();
        setShowForgotPassword(true);
        console.log(showForgotPassword);
      } else {
        toast.error("Enter Correct OTP");
        setShowForgotPassword(!showForgotPassword);
      }
    }
    verifyOTP(data, writtenOtp);
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
  const closemodal = () => {
    setviewotp(false);
    window.scroll(0, 0);
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
  useEffect(() => {
    startTimer(); // Start the timer when the component mounts
  }, []);
  useEffect(() => {
    if (timer === 0) {
      setDisabled(false);
    }
  }, [timer]);

  const handleResendClick = () => {
    const { cpassword, ...userdata } = data;
    userdata["phone"] = " ";
    console.log(userdata);
    setdata(userdata);
    const resdata = Signupuser(userdata);

    startTimer();
    // Add your OTP resend logic here
    //console.log("Resending OTP...");
  };
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  if (showForgotPassword) {
    return (
      <div>
        <h1 className="text-center py-3 text-2xl font-bold font-sans">
          Change Password
        </h1>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
          name="password"
          required
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
          name="password"
          required
        />
        <br />
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 duration-300 text-white font-bold py-2 px-4 rounded-xl"
        >
          Change Password
        </button>
      </div>
    );
  } else {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-screen items-start justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg mx-4">
                  <div className=" w-[100%] h-[70%] bg-white border-2  rounded-xl p-8 text-center ">
                    <div className="flex w-full items-end justify-end py-4 cursor-pointer">
                      <IoMdClose size={30} onClick={closemodal} />
                    </div>

                    <h1 className="">
                      Please enter the OTP sent to <br /> <b>{data.email}</b>
                      <span
                        className=" px-3 text-blue-500 font-semibold cursor-pointer"
                        onClick={closemodal}
                      >
                        Change
                      </span>{" "}
                    </h1>

                    <form onPaste={handlepaste}>
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
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
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
                        onClick={verifyOtp}
                        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl md:w-[40%] w-[100%] my-4 md:my-0"
                      >
                        Verify
                      </button>

                      <div className="py-4 my-2">
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
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }
}
