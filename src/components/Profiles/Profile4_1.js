import React, { useState } from "react";
import { useForm } from "react-hook-form";
import countryData from "../../asserts/Countrylist";
import Months from "../../asserts/Months";
import { useNavigate, useParams } from "react-router-dom";
import ReLogin from "../../pages/ReLogin";
import axios from "axios";

import { ImBin } from "react-icons/im";
import apiUrl from "../../apiConfig";

export default function Profile4_1({ formdetails }) {
  const token = localStorage.getItem("token");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [check, setcheck] = useState(false);
  const onSubmit = async (data) => {
    // Process the data and update the formdetails object
    // Similar to what you did in Profile4
    // For example:
    const projectDetails = {
      Title: data.Title,
      company: data.company,
      fromMonth: data.fromMonth,
      fromYear: data.fromYear,
      description: data.description,
      skills: skil
    };
    console.log(data);
    if (data.pursuing) {
      projectDetails.pursuing = true;
    } else {
      projectDetails.toMonth = data.toMonth;
      projectDetails.toYear = data.toYear;
    }
    if (!formdetails.projects) {
      formdetails.projects = [];
    }
    formdetails.projects.push(projectDetails);
    // Add the job details to the formdetails object
    // //console.log(
    //   formdetails.projects
    // )
    const reqbody = {
      projects: formdetails.projects,
    };
    try {
      const response = await axios.post(
        apiUrl.profile.editprofile + token,
        reqbody
      );
      //console.log(response);
      if (response.status == 200) {
        //console.log(response.body);
        // Navigate to the next page or wherever you want
        navigate(`/profile/project-review/${token}`);
      }
    } catch (err) {
      //console.log(err);
    }

    window.scroll(0, 0);
  };

  const [skil, setskills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [iniskills, setiniskills] = useState([]);

  const delitem = (itemToDelete) => {
    const updatedSkills = skil.filter((item) => item !== itemToDelete);
    setskills(updatedSkills);
    setiniskills([...iniskills, itemToDelete]);
  };

  const handleAddNewSkill = () => {
    if (newSkill.trim() !== "" && !skil.includes(newSkill)) {
      setskills([...skil, newSkill]);
      setNewSkill("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAddNewSkill();
  };

  const handleNewSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  const skip = () => {
    // Navigate to the next page or wherever you want
    navigate(`/profile/page5/${token}`);
    window.scroll(0, 0);
  };
  if (token == null) {
    return <ReLogin />;
  } else {
    return (
      <div>
        <div className=" h-1 w-full flex">
          <div className="h-full bg-blue-900 w-[48%]"></div>
          <div className="h-full bg-white w-[52%]"></div>
        </div>
        <div className="m-4 relative">
          <div className="py-3 text-2xl font-bold font-sans">Add Projects</div>
          <br />
          <br />
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="Title" className="font-semibold">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                name="Title"
                required
                {...register("Title")}
              />
            </div>
            <div>
              <label htmlFor="company" className="font-semibold">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                name="company"
                required
                {...register("company")}
              />
            </div>
            <div>
              <label className="font-semibold block">
                Time period <span className="text-red-500">*</span>
              </label>
              <div className="py-3 hover:cursor-pointer">
                <input
                  type="checkbox"
                  name="pursuing"
                  id="pursuing"
                  {...register("isPursuing")}
                  onChange={() => {
                    setcheck(!check);
                  }}
                />
                <label
                  htmlFor="pursuing"
                  className="text-sm text-justify hover:cursor-pointer px-2"
                >
                  I am currently working on this project
                </label>
              </div>
              <div>
                <label htmlFor="fromMonth" className="font-semibold block">
                  From <span className="text-red-500">*</span>
                </label>
                <div className="flex justify-around">
                  <select
                    className="w-[45%] p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                    name="fromMonth"
                    required
                    {...register("fromMonth")}
                  >
                    <option value="">Month</option>
                    {Months[0].map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-[45%] p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                    name="fromYear"
                    required
                    {...register("fromYear")}
                  >
                    <option value="">Year</option>
                    {Months[1].map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {!check || check === "false" ? (
                <div>
                  <label htmlFor="toMonth" className="font-semibold block">
                    To <span className="text-red-500">*</span>
                  </label>
                  <div className="flex justify-around">
                    <select
                      className="w-[45%] p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                      name="toMonth"
                      required
                      {...register("toMonth")}
                    >
                      <option value="">Month</option>
                      {Months[0].map((month, index) => (
                        <option key={index} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      className="w-[45%] p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                      name="toYear"
                      required
                      {...register("toYear")}
                    >
                      <option value="">Year</option>
                      {Months[1].map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : null}
            </div>
            
            <div>
              <label htmlFor="skills" className="font-semibold">
                skills
              </label>
              <div className="quill-container">
                <div className="w-full h-[40vh] border-2 rounded-2xl my-2 overflow-y-auto">
                  <ul className="flex flex-wrap p-4">
                  <div className="w-full justify-center flex items-center gap-2 ">
                  <div className="my-2">
                    <input
                      type="text"
                      className="p-2 border-b-2 rounded-md mx-3"
                      placeholder="Type a new skill"
                      value={newSkill}
                      onChange={handleNewSkillChange}
                      />
                    <button
                      className="hover:bg-blue-900 duration-300 hover:scale-110 hover:text-white font-bold py-2 px-4 rounded-xl"
                      type="submit" onClick={handleFormSubmit}
                      >
                      Add
                    </button>
                      </div>
                  </div>
                    {skil.map((item, key) => (
                      <li
                        className="hover:bg-blue-900 duration-300 hover:scale-110 hover:text-white m-2  cursor-pointer border-2 border-blue-900 p-2 rounded-xl flex justify-center items-center"
                        key={key}
                        onClick={() => delitem(item)}
                      >
                        <ImBin />
                        {item}
                      </li>
                    ))}
                  </ul>
              
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <div className="quill-container">
                <textarea
                  className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                  name="description"
                  rows="4"
                  {...register("description")}
                ></textarea>
              </div>
            </div>

            <br />
            <div className="flex flex-row-reverse justify-between">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl md:w-[40%] w-[100%] my-4 md:my-0"
              >
                Save & Continue
              </button>
              <button
                className="text-blue-800 hover:text-blue-900 font-semibold p-2 md:m-2 flex justify-center items-center gap-1"
                onClick={skip}
              >
                Skip
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
