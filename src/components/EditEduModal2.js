import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Months from "../asserts/Months";
import countryData from "../asserts/Countrylist";
import apiUrl from "../apiConfig";

export default function EditEduModal2({ vieweditprofile, setvieweditprofile, values }) {
  const [check, setcheck] = useState((values.toMonth === "" && values.toYear === "")? true: false);
  const checked = () => {
    setcheck(!check);
  };
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedtoMonth, setSelectedtoMonth] = useState("");
  const [selectedtoYear, setSelectedtoYear] = useState("");
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);
  const { handleSubmit, register, formState: errors } = useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const closemodal = () => {
    setvieweditprofile(!vieweditprofile);
  };
  const submitform = async (data) => {
    // console.log(data);
    if(data.isPursuing){
      data.toMonth = "";
      data.toYear = "";
    }
    const reqbody = {
      education: data,  id: values._id
    };
    try {
      const response = await axios.post(
        apiUrl.profile.editexp + token,
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
                        <label htmlFor="levelofedu" className=" font-semibold">
                          Level of education{" "}
                          <span className=" text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                          name="levelofedu"
                          required
                          defaultValue={values.levelofedu}
                          {...register("levelofedu")}
                        />
                      </div>
                      <div>
                        <label htmlFor="field" className=" font-semibold">
                          Field of study
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                          name="field"
                          defaultValue={values.field}
                          {...register("field")}
                        />
                      </div>
                      <div>
                        <label htmlFor="school" className=" font-semibold">
                          School name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                          name="school"
                          defaultValue={values.school}
                          {...register("school")}
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className=" font-semibold">
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                          name="city"
                          defaultValue={values.city}
                          {...register("city")}
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="font-semibold">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                          name="country"
                          required
                          defaultValue={values.country}
                          {...register("country")}
                        >
                          <option value="">Select a country</option>
                          {countryData.map((country, index) => (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        {/* education years */}

                        <div className="py-3">
                          <label className="font-semibold block">
                            Time period <span className="text-red-500">*</span>
                          </label>
                          <div className="py-3 hover:cursor-pointer">
                            <input
                              type="checkbox"
                              name="pursuing"
                              id="pursuing"
                              {...register("isPursuing")}
                              defaultChecked= {(values.toMonth === "" && values.toYear === "")? true: false}
                              onChange={() => {
                                setcheck(!check);
                              }}
                            />
                            <label
                              htmlFor="pursuing"
                              className="text-sm text-justify hover:cursor-pointer px-2"
                            >
                              Currently employed here
                            </label>
                          </div>
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
                                defaultValue={values.fromMonth}
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
                                defaultValue={values.fromYear}
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
                                  defaultValue={values.toMonth}
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
                                  defaultValue={values.toYear}
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
                      </div>
                      <br />
                      <div className="flex flex-row-reverse w-full justify-between">
                        <button
                          type="submit"
                          className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl md:w-[40%] w-[100%] my-4 md:my-0"
                          onClick={() => {
                            window.scroll(0, 0);
                          }}
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
