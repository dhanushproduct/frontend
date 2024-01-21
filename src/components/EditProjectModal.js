import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Months from "../asserts/Months";
import { ImBin } from "react-icons/im";
import apiUrl from "../apiConfig";

export default function EditProjectModal({
  vieweditprofile,
  setvieweditprofile,
  defaultvalues,
}) {
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);
  const { handleSubmit, register, formState: errors } = useForm({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [check, setcheck] = useState(false);
  const submitform = async (data) => {
    // console.log(data)
    data.skills = skil
    const reqbody = {
      projects: data,
    };
    try {
      const response = await axios.post(
        apiUrl.profile.addexp + token,
        reqbody
      );
      //console.log(response);
      if (response.status == 200) {
        //console.log(response.body);
        // Navigate to the next page or wherever you want
        closemodal();
      }
    } catch (err) {
      //console.log(err);
    }
  };
  const closemodal = () => {
    setvieweditprofile(!vieweditprofile);
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
                <div className=" w-[100%] h-[70%] bg-white rounded-xl border-2 p-4 ">
                  <div className="flex w-full items-end justify-end py-4 cursor-pointer">
                    <IoMdClose size={30} onClick={closemodal} />
                  </div>

                  <div className="">
                    <form action="" onSubmit={handleSubmit(submitform)}>
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
                        <div>
                          <label
                            htmlFor="fromMonth"
                            className="font-semibold block"
                          >
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

                        {!check || check === "false" ? (
                          <div>
                            <label
                              htmlFor="toMonth"
                              className="font-semibold block"
                            >
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
                                    type="submit"
                                    onClick={handleFormSubmit}
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
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
