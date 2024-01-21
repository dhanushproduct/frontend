import React, {useEffect} from "react";
import { IoMdClose } from "react-icons/io";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {toast} from "react-toastify"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import skills from "../asserts/Skills";
import { ImBin } from "react-icons/im";
import apiUrl from "../apiConfig";
export default function EditSkillsModal({
  vieweditprofile,
  setvieweditprofile,
}) {
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [iniskills, setiniskills] = useState(skills);
  const [skil, setskills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const addlist = (value) => {
    if (!skil.includes(value)) setskills([...skil, value]);
    setiniskills(iniskills.filter((ite) => ite !== value));
  };

  const delitem = (itemToDelete) => {
    const updatedSkills = skil.filter((item) => item !== itemToDelete);
    setskills(updatedSkills);
    setiniskills([...iniskills, itemToDelete]);
  };

  const handleNewSkillChange = (e) => {
    setNewSkill(e.target.value);
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
  useEffect(() => {
    const getprofile = async () => {
      try {
        const response = await axios.get(
          apiUrl.profile.getprofile + token
          );
        //console.log(response.status);
        setskills(response.data.existing_profile.skills);
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
  }, []);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [check, setcheck] = useState(false);
  const submitbut = async () => {
    console.log(skil);
    const reqbody = {
      skills: skil,
    };
    try {
      const response = await axios.post(
        `http://localhost:4000/api/profile/editprofile/${token}`,
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

                  <div>
                    <div>
                      <div className="py-3 text-2xl font-bold font-sans">
                        What are some of your skills?
                      </div>
                      <div className="text-sm">
                        We recommend at least 4 skills
                      </div>
                      <br />
                      <div className="w-full h-[40vh] border-2 rounded-2xl  overflow-y-auto">
                        <ul className="flex flex-wrap p-4">
                          {skil.map((item, key) => (
                            <li
                              className="hover:bg-blue-900 duration-300 hover:scale-110 hover:text-white m-4  cursor-pointer border-2 border-blue-900 p-2 rounded-xl flex justify-center items-center gap-1"
                              key={key}
                              onClick={() => delitem(item)}
                            >
                              <ImBin />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <br />
                      <hr />
                      <br />
                      <div className="w-full justify-center flex items-center gap-2">
                        <form onSubmit={handleFormSubmit}>
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
                          >
                            Add
                          </button>
                        </form>
                      </div>
                      <br />
                      <ul className="w-full flex flex-wrap gap-2">
                        {iniskills.map((item, key) => (
                          <li
                            onClick={() => addlist(item)}
                            className="hover:bg-blue-900 duration-300 hover:scale-110 hover:text-white cursor-pointer p-2 rounded-xl flex justify-center items-center gap-2 m-2"
                            key={key}
                          >
                            <GrAdd color="#6e5aea" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <br />
                      <div className="flex flex-row-reverse">
                        <button
                          className="bg-blue-800 hover:bg-blue-900 duration-300 text-white font-bold py-2 px-4 rounded-xl"
                          onClick={submitbut}
                        >
                          Save & Continue
                        </button>
                      </div>
                    </div>
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
