import React from "react";
import {  Outlet } from "react-router-dom";
export default function Profileincom() {
  
  return (
    <div className="flex justify-center items-center p-3 ">
      <div className="flex flex-col w-[100vw] md:w-[40vw] h-full border-2 rounded-lg shadow-lg shadow-slate-300 bg-white">
       
        <Outlet/>
      </div>
    </div>
  );
}
