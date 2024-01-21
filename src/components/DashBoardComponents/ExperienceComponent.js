import React from "react";
import { GoPlus } from "react-icons/go";
import TimelineComponent from "../EduExp";
import { IoIosArrowUp } from "react-icons/io";
export default function ExperienceComponent({
  dash,
  setshoweditexperience,
  showAllJobs,
  setShowAllJobs,
  showeditexperience,
  visibleItemsJobs,
  publicview,
}) {
  const token = localStorage.getItem("token");
  return (
    <div className="space-y-2 w-full p-4 bg-white rounded-xl ">
      <div className="text-lg font-medium text-gray-900 flex justify-between p-4">
        Experience{" "}
        {!publicview && (
          <div className="flex gap-4">
            <div className=" w-auto p-2 hover:bg-slate-200 rounded-full duration-150 cursor-pointer">
              <GoPlus
                onClick={() => setshoweditexperience(!showeditexperience)}
              />
            </div>
          </div>
        )}
      </div>
      {/* <TimelineComponent /> */}
      {dash.jobs.length !== 0 ? (
        visibleItemsJobs.map((item, key) => (
          <TimelineComponent key={key} props={{ token: token, item: item, publicview:publicview }} />
        ))
      ) : (
        <div className="text-gray-500 text-md w-full text-center">
          {" "}
          No Experience mentioned{" "}
        </div>
      )}
      {dash.jobs.length > 2 && (
        <div className="flex w-full justify-center items-center  border-slate-300">
          <hr className="w-[30%]" />
          <button
            className=" border-2 p-2 rounded-3xl flex gap-2 items-center justify-center hover:bg-gray-200 focus:border-black duration-300"
            onClick={() => setShowAllJobs(!showAllJobs)}
          >
            {showAllJobs
              ? "Show Less Experiences"
              : `Show All ${dash.jobs.length} Experiences`}{" "}
            <IoIosArrowUp className={showAllJobs ? "rotate-0" : "rotate-180"} />
          </button>
          <hr className="w-[30%]" />
        </div>
      )}
    </div>
  );
}
