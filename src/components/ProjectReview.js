import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function ProjectReview({ formdetails }) {
  const {id} = useParams();
  const navigate = useNavigate();

  // Initialize jobData as an empty array if it's undefined in formdetails
  const jobData = formdetails.projects || [];
  const [jobDetails, setJobDetails] = useState(jobData);

  const editJob = (index) => {
    // Navigate to the job editing page (e.g., Profile6) with the index of the job item to edit
    navigate(`/profile/page5/${id}`);
  };

  const deleteJob = (index) => {
    // Create a new array that excludes the job item at the specified index
    const updatedJobData = jobData.filter((_, i) => i !== index);

    // Update the formdetails object (if needed)
    // ...

    // Update the jobData state with the modified array
    setJobDetails(updatedJobData);
  };

  useEffect(() => {
    setJobDetails(jobData);
  }, [jobData]);

  return (
    <div>
      <div className="h-1 w-full flex">
        <div className="h-full bg-blue-900 w-[48%]"></div>
        <div className="h-full bg-white w-[52%]"></div>
      </div>
      <div className="m-2 p-2">
        <h2 className="py-3 text-2xl font-bold font-sans text-center">
          Project Review
        </h2>
        <br />
        <ul>
          {jobDetails.map((job, index) => (
            <li
              key={index}
              className="p-4 m-2 bg-slate-100 rounded-md  flex flex-wrap justify-between break-all"
            >
              <div className="w-[80%]">
                <div className="text-xl uppercase font-semibold">
                  {job.Title}
                </div>
                <div>
                  {job.Company}
                </div>
                
                <div className="flex gap-1">
                  <div>
                    {job.fromMonth.slice(0, 3)} {job.fromYear} -
                  </div>
                  {job.toMonth && job.toYear && (
                    <div>
                      {job.toMonth.slice(0, 3)} {job.toYear}
                    </div>
                  )}
                  {!job.toMonth && !job.toYear && <div>Present</div>}
                </div>
                <div className="  text-sm">{job.description.slice(0, 100)}...</div>
                <div className="text-sm">skills: {
                  job.skills.map((item, key) => <span>{item} </span>)
                }
                </div>
              </div>
              <div className="gap-3 flex">
                {/* <button onClick={() => editJob(index)}>
                  <AiFillEdit size={25} />
                </button> */}
                <button onClick={() => deleteJob(index)}>
                  <MdDeleteForever color="red" size={25} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <br />
        <br />
        <div className="flex justify-between">
          <button
            className="text-blue-800 hover:text-blue-900 font-semibold p-2 m-2 flex justify-center items-center gap-1"
            onClick={() => navigate(`/profile/page4-1/${id}`)}
          >
            <IoIosAddCircleOutline size={20} /> Add Job
          </button>
          <button
            className="bg-blue-800 hover:bg-blue-900 duration-300 text-white font-bold py-2 px-4 rounded-xl"
            onClick={() => navigate(`/profile/page5/${id}`)}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
