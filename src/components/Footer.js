import React from "react";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="bg-gray-800  text-gray-300">
      <div className="flex flex-wrap justify-center w-full">
        <div className=" p-4 m-3 lg:w-[20vw] md:w-[40vw] sm:w-[40vw] ">
          <h2 className="text-2xl text-gray-200 py-2">Job Seekers</h2>
          <h1 className="py-1">Candidate Signup</h1>
          <h1 className="py-1">Success Stories</h1>
          <h1 className="py-1">FAQ</h1>
        </div>
        <div className=" p-4 m-3 lg:w-[20vw] md:w-[40vw] sm:w-[40vw] ">
          <h2 className="text-2xl text-gray-200 py-2">Employers</h2>
          <h1 className="py-1">Employer Signup</h1>
          <h1 className="py-1">Success Stories</h1>
          <h1 className="py-1">FAQ</h1>
        </div>
        <div className=" p-4 m-3 lg:w-[20vw] md:w-[40vw] sm:w-[40vw] ">
          <h2 className="text-2xl text-gray-200 py-2">Company</h2>
          <h1 className="py-1">Support</h1>
          <h1 className="py-1">About Company</h1>
          <h1 className="py-1">Careers</h1>
        </div>
        <div className=" p-4 m-3 lg:w-[20vw] md:w-[40vw] sm:w-[40vw] ">
          <h2 className="text-2xl text-gray-200 py-2">Resources</h2>
          <h1 className="py-1">Events</h1>
          <h1 className="py-1">Jobs directory</h1>
          <h1 className="py-1">Company directory</h1>
          <h1 className="py-1">Release notes</h1>
        </div>
      </div>
      {/* social media handles */}
      <div className="text-center w-full p-5">
        <span className="sm:inline hidden text-lg">Follow us on :</span>
        <span className=" p-2 text-xl">
          <BsFacebook className=" inline" />
        </span>
        <span className=" p-2 text-xl">
          <BsInstagram className=" inline" />
        </span>
        <span className=" p-2 text-xl">
          <BsTwitter className=" inline" />
        </span>
        <span className=" p-2 text-xl">
          <BsLinkedin className=" inline" />
        </span>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-[85vw] h-[1px] bg-gray-400"></div>
      </div>

      {/* copy rights */}
      <div className="text-center w-full p-5">
        © 2020 Your Company, Inc. All rights reserved.
      </div>
    </div>
  );
}
