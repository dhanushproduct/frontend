import React, { useState } from "react";
import Signupform from "../components/Signupform";
import MailOtp from "../components/MailOtp"
import ReDashboard from "./ReDashboard";

export default function Signup() {
  const [role, setRole] = useState("jobseeker");
  
  const token = localStorage.getItem("token");

  const toggleRole = () => {
    setRole(role === "jobseeker" ? "employer" : "jobseeker");
  };

  if(token!=null){
    return <ReDashboard/>
  }
  else{

  return (
    <div className="flex lg:flex-row flex-col md:m-[3rem] m-[1rem]  ">
      <div className="lg:w-[50vw] w-[100%] p-2">
        <h2 className="text-[2rem] font-bold">3 Reasons You'll Love aspireup</h2>
        <ul className="py-3">
          <li className="list-disc text-lg">
            Companies apply to you, not the other way around.
          </li>
          <li className="list-disc text-lg">
            You can hide your info from current and former employers
          </li>
          <li className="list-disc text-lg">It’s free for candidates!</li>
        </ul>
        <h2 className="italic text-xl text-blue-950 font-semibold">
          Get started and find your dream job today!
        </h2>
        <br /><br />
      </div>
      <div className="flex flex-col w-[100%] lg:w-[50vw] h-full min-h-[80vh] border-2 rounded-lg shadow-lg shadow-slate-300 bg-white">
        {/* <div className="flex flex-row h-[40px]">
          <div
            className={`w-[50%] text-center flex items-center justify-center h-full hover:cursor-pointer rounded-md ${role === "jobseeker" ? "bg-white" : "bg-gray-200"}`}
            onClick={role === "jobseeker" ? null : toggleRole}
          >
            Jobseeker
          </div>
          <div
            className={`w-[50%] text-center flex items-center justify-center h-full hover:cursor-pointer rounded-md ${role === "employer" ? "bg-white" : "bg-gray-200"}`}
            onClick={role === "employer" ? null : toggleRole}
          >
            Employer
          </div>
        </div> */}
        <div className="h-full">
          <div className="m-4 relative">
            {
              role === "jobseeker" &&
            <Signupform />
            }
            {
              role === "employer" && 
              "Employer signin form"
            }
          </div>
        </div>
      </div>
    </div>
  );
      }
}





