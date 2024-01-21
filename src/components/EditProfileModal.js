import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import countryData from "../asserts/Countrylist";
import apiUrl from "../apiConfig";

export default function EditProfileModel({
  vieweditprofile,
  setvieweditprofile,
}) {
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);
  const { handleSubmit, register, formState: errors } = useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function createEmptyEducation() {
    return {
      levelofedu: " ",
      field: " ",
      school: " ",
      city: " ",
      Country: " ",
      fromMonth: " ",
      fromYear: " ",
    };
  }

  function createEmptyJob() {
    return {
      jobTitle: " ",
      company: " ",
      Country: " ",
      city: " ",
      fromMonth: " ",
      fromYear: " ",
      description: " ",
      toMonth: " ",
      toYear: " ",
    };
  }

  function createEmptySurvey() {
    return {
      gender: " ",
      race: {
        isAsian: false,
        isPacific: false,
        isBlack: false,
        isWhite: false,
        isLatinx: false,
        isNotListed: false,
        isNativeAmerican: false,
      },
      sex: " ",
      age: " ",
      militarystatus: " ",
    };
  }

  function createEmptysociaclaccounts() {
    return {
      socialaccounts: {
        LinkedIn: "",
        GitHub: "",
        HackerRank: "",
        CodeChef: "",
        WebSite: "",
      },
    };
  }

  function createEmptyProfile() {
    return {
      FullName: {
        FirstName: "",
        LastName: "",
        DisplayFirstName: "",
        DisplayLastName: "",
      },
      Location: {
        Country: "",
        StreetAddress: "",
        City: "",
        PinCode: "",
      },
      education: [createEmptyEducation()],
      jobs: [createEmptyJob()],
      skills: [],
      currentRole: "",
      socialaccounts: createEmptysociaclaccounts(),
      WorkLocation: [],
      Survey: createEmptySurvey(),
      componentOrder: [ "Recognitions",
      "ProjectsComponent",
      "SkillsComponent",
      "ExperienceComponent",
      "EducationComponent",]
    };
  }
  const [dash, setdash] = useState(createEmptyProfile);

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
  }, [token]);
  const submitform = async (data) => {
    const reqbody = {
      FullName: {
        FirstName: dash.FullName.FirstName,
        LastName: dash.FullName.LastName,
        DisplayFirstName:
          data.DisplayFirstName === "" ? dash.FullName.DisplayFirstName : data.DisplayFirstName,
        DisplayLastName: data.DisplayLastName === "" ? dash.FullName.DisplayLastName : data.DisplayLastName,
      },
      Location: {
        City: data.City === "" ? dash.Location.City : data.City,
        StreetAddress: dash.Location.StreetAddress,
        Country: dash.Location.Country,
        PinCode: dash.Location.PinCode,
      },
      currentRole:
        data.currentRole === "" ? dash.currentRole : data.currentRole,
      socialaccounts: {
        LinkedIn:
          data.LinkedIn === "" ? dash.socialaccounts.LinkedIn : data.LinkedIn,
        GitHub: data.GitHub === "" ? dash.socialaccounts.GitHub : data.GitHub,
        HackerRank:
          data.HackerRank === ""
            ? dash.socialaccounts.HackerRank
            : data.HackerRank,
        CodeChef:
          data.CodeChef === "" ? dash.socialaccounts.CodeChef : data.CodeChef,
        WebSite:
          data.WebSite === "" ? dash.socialaccounts.WebSite : data.WebSite,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/api/profile/editprofile/${token}`,
        reqbody
      );
      if (response.status === 200) {
        closemodal();
      }
    } catch (err) {
      console.error(err);
      // Handle the error as needed
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

                  <div className="">
                    <form action="" onSubmit={handleSubmit(submitform)}>
                      <div className="">
                        <label htmlFor="firstname" className=" font-semibold">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-1 border-b-4 border-2 text-gray-800 rounded-md my-1"
                          name="firstname"
                          defaultValue={dash.FullName.DisplayFirstName}
                          {...register("DisplayFirstName")}
                        />
                      </div>
                      <div className="my-4">
                        <label htmlFor="firstname" className=" font-semibold">
                          Last Name
                        </label>
                        <input
                          type="text"
                          //   placeholder="Last Name"
                          className="w-full p-1 border-b-4 border-2 text-gray-800 rounded-md my-1"
                          name="lastname"
                          defaultValue={dash.FullName.DisplayLastName}
                          {...register("DisplayLastName")}
                        />
                      </div>
                      <div className="my-4">
                        <label htmlFor="currentRole" className=" font-semibold">
                          Current Role
                        </label>
                        <input
                          type="text"
                          //   placeholder="Last Name"
                          className="w-full p-1 border-b-4 border-2 text-gray-800 rounded-md my-1"
                          name="currentRole"
                          defaultValue={dash.currentRole}
                          {...register("currentRole")}
                        />
                      </div>
                      <div>
                        <label htmlFor="City" className="font-semibold">
                          City
                        </label>
                        <input
                          type="text"
                          //   placeholder="Last Name"
                          className="w-full p-1 border-b-4 border-2 text-gray-800 rounded-md my-1"
                          name="currentRole"
                          defaultValue={dash.Location.City}
                          {...register("City")}
                        />
                         
                      </div>

                      <div className="my-4">
                        <label htmlFor="GitHub" className=" font-semibold">
                          GitHub
                        </label>
                        <input
                          type="text"
                          //   placeholder="Last Name"
                          className="w-full p-1 border-b-4 border-2 text-gray-800 rounded-md my-1"
                          name="GitHub"
                          defaultValue={dash.socialaccounts.GitHub}
                          {...register("GitHub")}
                        />
                      </div>
                      <div className="my-4">
                        <label htmlFor="LinkedIn" className=" font-semibold">
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          //   placeholder="Last Name"
                          className="w-full p-1 border-b-4 border-2 text-gray-800 rounded-md my-1"
                          name="LinkedIn"
                          defaultValue={dash.socialaccounts.LinkedIn}
                          {...register("LinkedIn")}
                        />
                      </div>
                      <div className="my-4">
                        <label htmlFor="Website" className=" font-semibold">
                          Website
                        </label>
                        <input
                          type="text"
                          //   placeholder="Last Name"
                          className="w-full p-1 border-b-4 border-2 text-gray-800 rounded-md my-1"
                          name="Website"
                          defaultValue={dash.socialaccounts.WebSite}
                          {...register("WebSite")}
                        />
                      </div>
                      <div className="my-4">
                        <label htmlFor="HackerRank" className=" font-semibold">
                          HackerRank
                        </label>
                        <input
                          type="text"
                          //   placeholder="Last Name"
                          className="w-full p-1 border-b-4 border-2 text-gray-800 rounded-md my-1"
                          name="HackerRank"
                          defaultValue={dash.socialaccounts.HackerRank}
                          {...register("HackerRank")}
                        />
                      </div>
                      <div className="my-4">
                        <label htmlFor="CodeChef" className=" font-semibold">
                          CodeChef
                        </label>
                        <input
                          type="text"
                          //   placeholder="Last Name"
                          className="w-full p-1 border-b-4 border-2 text-gray-800 rounded-md my-1"
                          name="CodeChef"
                          defaultValue={dash.socialaccounts.CodeChef}
                          {...register("CodeChef")}
                        />
                      </div>
                      <div className="flex flex-row-reverse pt-4">
                        <button
                          type="submit"
                          onClick={() => {
                            window.scroll(0, 0);
                          }}
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
