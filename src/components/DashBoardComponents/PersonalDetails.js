import React from "react";

import { FaPlus } from "react-icons/fa6";

import { FaEdit, FaHackerrank, FaLinkedin } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { MdContactPage, MdToken } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { MdAccountCircle } from "react-icons/md";
import coverphoto from "../../asserts/coverphoto.png";
import { FaEye } from "react-icons/fa";

export default function PersonalDetails({ dash, handleEditProfile, openModal, publicview, setpublicview }) {
  const buttontextstyle = "text-xs lg:text-lg md:text-md"
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleViewResume = () =>{
    navigate(`/resume/${token}`);

  }
  return (
    <div>
      <div className="w-full h-[25vh] aspect-auto  rounded-t-md">
        <img
          src={coverphoto}
          alt=""
          className="h-full w-full bg-cover rounded-t-md"
        />
      </div>
      <div className="w-full p-4 bg-white rounded-xl">
        <MdAccountCircle className="w-[20vh] h-[20vh] rounded-full bg-white relative mt-[-15vh]" />

        <div className="flex flex-row justify-between items-center md:px-6 px-2 py-4 flex-wrap">
          <div className=" font-bold text-gray-900">
            <div className="text-2xl capitalize font-semibold">
              {dash.FullName.DisplayFirstName} {dash.FullName.DisplayLastName}
              {/* DHANUSH GUMMADAVALLI */}
            </div>
            <h2 className="text-lg font-medium text-gray-900">
              {/* Software Engineer */}
              {dash.Location.City}
            </h2>
            <h2 className=" text-sm font-medium text-gray-700">
              1232 Followers - 500+ Connections
            </h2>
          </div>
          <p className="text-gray-500 text-md">{dash.currentRole}</p>
        </div>
        <div className="flex w-full justify-between flex-wrap flex-col">
          <div className="md:px-6 px-2  flex gap-4 ">
            {
              publicview &&
              <div className="border-2 px-2 py-1 rounded-3xl bg-blue-200 border-blue-200 hover:bg-blue-300 hover:border-blue-300 cursor-pointer bg-opacity-70 border-opacity-70">
              <div className="flex gap-1 justify-center items-center">
                <FaPlus size={15} /> <p className={buttontextstyle}>Follow</p>
              </div>
            </div>
            }
            { !publicview && 
            
              <div
              className="border-2 px-2 py-1 rounded-3xl bg-blue-200 border-blue-200 hover:bg-blue-300 hover:border-blue-300 cursor-pointer bg-opacity-70 border-opacity-70"
              onClick={handleEditProfile}
              >
              <div className="flex gap-1 justify-center items-center">
                <FaEdit size={15} /> <p className={buttontextstyle}>Edit</p>
              </div>
            </div>}
            { !publicview && 
            <div
            className="border-2 px-2 py-1 rounded-3xl bg-blue-200 border-blue-200 hover:bg-blue-300 hover:border-blue-300 cursor-pointer bg-opacity-70 border-opacity-70"
            onClick={openModal}
            >
              <div className="flex gap-1 justify-center items-center">
                <FaEdit size={15} /> <p className={buttontextstyle}>Change Order</p>
              </div>
            </div>
          }
            <div
              className="border-2 px-2 py-1 rounded-3xl bg-blue-200 border-blue-200 hover:bg-blue-300 hover:border-blue-300 cursor-pointer bg-opacity-70 border-opacity-70"
              onClick={() => setpublicview(!publicview)}
              >
              <div className="flex gap-1 justify-center items-center">
                {publicview? <FaEdit size={15} />: <FaEye size={15} />}
                <p className={buttontextstyle}>
                {publicview? "View as Editor": "View as Public"}
                </p>
              </div>
            </div>
            <div
              className="border-2 px-2 py-1 rounded-3xl bg-blue-200 border-blue-200 hover:bg-blue-300 hover:border-blue-300 cursor-pointer bg-opacity-70 border-opacity-70"
              onClick={() => handleViewResume()}
              >
              <div className="flex gap-1 justify-center items-center">
                <MdContactPage size={15} />
                <p className={buttontextstyle}>
                View Resume
                </p>
              </div>
            </div>

            

            {/* <Button size="sm" color="info" pill={true}>
                  <div className="flex gap-1 justify-center items-center">
                    <FaRegPaperPlane size={15} />{" "}
                    <p className={buttontextstyle}>Message</p>
                  </div>
                </Button> */}
          </div>
          <hr className=" mt-4" />
          <div className=" flex gap-6 px-6 lg:py-4 py-6 ">
            <a
              href={dash.socialaccounts.GitHub}
              className={`${
                dash.socialaccounts.GitHub === "" ? "hidden" : "block"
              }`}
              target="blank"
            >
              <FaGithub size={25} />
            </a>
            <a
              href={dash.socialaccounts.LinkedIn}
              className={`${
                dash.socialaccounts.LinkedIn === "" ? "hidden" : "block"
              }`}
              target="blank"
            >
              <FaLinkedin size={25} />
            </a>
            <a
              href={dash.socialaccounts.WebSite}
              className={`${
                dash.socialaccounts.WebSite === "" ? "hidden" : "block"
              }`}
              target="blank"
            >
              <FaGlobe size={25} />
            </a>
            <a
              href={dash.socialaccounts.HackerRank}
              className={`${
                dash.socialaccounts.HackerRank === "" ? "hidden" : "block"
              }`}
              target="blank"
            >
              <FaHackerrank size={25} />
            </a>
            <a
              href={dash.socialaccounts.CodeChef}
              className={`${
                dash.socialaccounts.CodeChef === "" ? "hidden" : "block"
              }`}
              target="blank"
            >
              <SiCodechef size={25} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
