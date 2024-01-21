import React from 'react'
import ReDashboard from './ReDashboard';
import { useState } from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

export default function ForgotPassword() {
    const [role, setRole] = useState("jobseeker");

    const token = localStorage.getItem("token");
    //console.log(token);
    
    const toggleRole = () => {
      setRole(role === "jobseeker" ? "employer" : "jobseeker");
    };
  
    if(token!=null){
     return  <ReDashboard/>
    }
    else{
    return (
      <div className="flex justify-center items-center p-3 min-h-[90vh] ">
        
        <div className="flex flex-col w-[100vw] md:w-[40vw] h-full border-2 rounded-lg shadow-lg shadow-slate-300 bg-white">
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
              <ForgotPasswordForm />
              }
              {
                role === "employer" && 
                "employer login form"
              }
            </div>
          </div>
        </div>
      </div>
    );
            }
  
}
