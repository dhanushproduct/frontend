import React, { useEffect, useState } from "react";
import Recognitions from "../components/Recognitions";
import ReLogin from "./ReLogin";
import axios from "axios";
import { toast } from "react-toastify";
import EditProfileModel from "../components/EditProfileModal";
import EditEduModel from "../components/EditEduModal";
import EditExpModel from "../components/EditExpModal";
import EditSkillsModal from "../components/EditSkillsModal";
import EditProjectModal from "../components/EditProjectModal";
import createEmptyProfile from "../asserts/ProfileModel";
import "../App.css";
import PersonalDetails from "../components/DashBoardComponents/PersonalDetails";
import ProjectsComponent from "../components/DashBoardComponents/ProjectsComponent";
import SkillsComponent from "../components/DashBoardComponents/SkillsComponent";
import ExperienceComponent from "../components/DashBoardComponents/ExperienceComponent";
import EducationComponent from "../components/DashBoardComponents/EducationComponent";
import OrderModal from "../components/DashBoardComponents/OrderModal";
import apiUrl from "../apiConfig";
import ToggleOptions from "../components/ToggleOptions";
const Layout = () => {
  const [vieweditprofile, setvieweditprofile] = useState(false);
  const [showeditexperience, setshoweditexperience] = useState(false);
  const [showediteducation, setshowediteducation] = useState(false);
  const [showskills, setshowskills] = useState(false);
  const [dash, setdash] = useState(createEmptyProfile);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showprojectmodal, setshowprojectmodal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [componentOrder, setComponentOrder] = useState([
    "Recognitions",
    "ProjectsComponent",
    "SkillsComponent",
    "ExperienceComponent",
    "EducationComponent",
  ]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const handleSubmit = async () => {
    // Update the server with the new component order
    const reqbody = {
      componentOrder: componentOrder,
    };
    console.log(reqbody);
    try {
      const response = await axios.post(
        apiUrl.profile.editprofile + token,
        reqbody
      );
      if (response.status === 200) {
        closeModal();
      }
    } catch (err) {
      console.error(err);
      // Handle the error as needed
    }
  };
  const visibleItemsJobs = showAllJobs ? dash.jobs : dash.jobs.slice(0, 2);
  const visibleItemsprojects = showAllProjects
    ? dash.projects
    : dash.projects.slice(0, 2);
  const visibleItemsEducation = showAllEducation
    ? dash.education
    : dash.education.slice(0, 2);

  const token = localStorage.getItem("token");
  //console.log(token);
  useEffect(() => {
    const getprofile = async () => {
      try {
        const response = await axios.get(
          apiUrl.profile.getprofile + token
        );
        //console.log(response.status);
        setdash(response.data.existing_profile);
      } catch (err) {
        if (err.response.status === 401) {
          toast.error("You have to Login");
          // navigate("/login")
        }
        //console.log(err);
      }
    };

    getprofile();
    //console.log("working");
  }, [
    token,
    vieweditprofile,
    showediteducation,
    showeditexperience,
    showskills,
    showprojectmodal,
    dash.projects,
    dash.jobs,
    dash.education,
  ]);

  const renderComponent = (componentId) => {
    switch (componentId) {
      case "Recognitions":
        return <Recognitions />;
      case "ProjectsComponent":
        return (
          <ProjectsComponent
            dash={dash}
            setshowprojectmodal={setshowprojectmodal}
            showprojectmodal={showprojectmodal}
            visibleItemsprojects={visibleItemsprojects}
            setShowAllProjects={setShowAllProjects}
            showAllProjects={showAllProjects}
            publicview = {publicview}
          />
        );
      case "SkillsComponent":
        return (
          <SkillsComponent
            dash={dash}
            setshowskills={setshowskills}
            showskills={showskills}
            publicview = {publicview}
          />
        );
      case "ExperienceComponent":
        return (
          <ExperienceComponent
            dash={dash}
            setshoweditexperience={setshoweditexperience}
            showAllJobs={showAllJobs}
            setShowAllJobs={setShowAllJobs}
            showeditexperience={showeditexperience}
            visibleItemsJobs={visibleItemsJobs}
            publicview = {publicview}
          />
        );
      case "EducationComponent":
        return (
          <EducationComponent
            dash={dash}
            setshowediteducation={setshowediteducation}
            showAllEducation={showAllEducation}
            setShowAllEducation={setShowAllEducation}
            showediteducation={showediteducation}
            visibleItemsEducation={visibleItemsEducation}
            publicview = {publicview}
          />
        );
      default:
        return null;
    }
  };

  const [publicview, setpublicview] = useState(false);

  const handleEditProfile = () => {
    // navigate(`/profile/page2/${token}`);
    setvieweditprofile(!vieweditprofile);
  };

  if (token == null) {
    return <ReLogin />;
  } else {
    return (
      <div>
        <div>
          {vieweditprofile && (
            <EditProfileModel
              vieweditprofile={vieweditprofile}
              setvieweditprofile={setvieweditprofile}
            />
          )}
          {showprojectmodal && (
            <EditProjectModal
              vieweditprofile={showprojectmodal}
              setvieweditprofile={setshowprojectmodal}
            />
          )}
          {showediteducation && (
            <EditEduModel
              vieweditprofile={showediteducation}
              setvieweditprofile={setshowediteducation}
            />
          )}
          {showeditexperience && (
            <EditExpModel
              vieweditprofile={showeditexperience}
              setvieweditprofile={setshoweditexperience}
            />
          )}
          {showskills && (
            <EditSkillsModal
              vieweditprofile={showskills}
              setvieweditprofile={setshowskills}
            />
          )}
          <div>
            {showModal && (
              <OrderModal
                componentOrder={componentOrder}
                setComponentOrder={setComponentOrder}
                onClose={closeModal}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-around min-h-screen min-w-[425px]  gap-4 bg-gray-100 p-4">
          <div className=" rounded-md md:w-[65%] w-[100%] ">
            <div className=" py-4 space-y-4 ">
              <PersonalDetails
                dash={dash}
                handleEditProfile={handleEditProfile}
                openModal={openModal}
                publicview = {publicview}
                setpublicview = {setpublicview}
              />
              {dash.componentOrder.map((item, key) => (
                <div key={key}>{renderComponent(item)}</div>
              ))}
            </div>
          </div>
          <div className="md:w-[20%] w-[100%] h-full bg-gray-100  rounded-xl">
            <ToggleOptions
              publicview = {publicview}
              setpublicview = {setpublicview}
              />
          </div>
        </div>
      </div>
    );
  }
};

export default Layout;
