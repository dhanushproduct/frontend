import React, { useState } from "react";
import { useForm } from "react-hook-form";
import countryData from "../../asserts/Countrylist";
import Months from "../../asserts/Months";
import { useNavigate, useParams } from "react-router-dom";
import ReLogin from "../../pages/ReLogin";
import axios from "axios";
import apiUrl from "../../apiConfig";

export default function Profile5({ formdetails }) {

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
    const jobDetails = {
      jobTitle: data.jobTitle,
      company: data.company,
      country: data.country,
      city: data.city,
      fromMonth: data.fromMonth,
      fromYear: data.fromYear,
      description: data.description,
    };

    if (data.pursuing) {
      jobDetails.pursuing = true;
    } else {
      jobDetails.toMonth = data.toMonth;
      jobDetails.toYear = data.toYear;
    }
    if (!formdetails.jobs) {
      formdetails.jobs = [];
    }
    formdetails.jobs.push(jobDetails);
    // Add the job details to the formdetails object
    // //console.log(
    //   formdetails.jobs
    // )
    const reqbody = {
      jobs: formdetails.jobs,
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
        navigate(`/profile/job-review/${token}`);
      }
    } catch (err) {
      //console.log(err);
    }

    window.scroll(0, 0);
  };

  const skip = () => {
    // Navigate to the next page or wherever you want
    navigate(`/profile/page6/${token}`);
    window.scroll(0, 0);
  };
  if(token==null){
    return <ReLogin/>
  }else{
  return (
    <div>
      <div className=" h-1 w-full flex">
        <div className="h-full bg-blue-900 w-[56%]"></div>
        <div className="h-full bg-white w-[44%]"></div>
      </div>
      <div className="m-4 relative">
        <div className="py-3 text-2xl font-bold font-sans">
          Add Work Experience
        </div>
        <br />
        <br />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="jobTitle" className="font-semibold">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
              name="jobTitle"
              required
              {...register("jobTitle")}
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
            <label htmlFor="city" className="font-semibold">
              City
            </label>
            <input
              type="text"
              className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
              name="city"
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
                Currently employed here
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
