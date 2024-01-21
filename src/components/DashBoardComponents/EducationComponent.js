import React from 'react'
import { GoPlus } from "react-icons/go";
import Education from '../Education';
import { IoIosArrowUp } from "react-icons/io";

export default function EducationComponent({dash, setshowediteducation, showAllEducation, setShowAllEducation, showediteducation, visibleItemsEducation, publicview}) {
 const token = localStorage.getItem("token")
    return (
    <div className="space-y-2 w-full p-4 bg-white rounded-xl ">
                <div className="text-lg font-medium text-gray-900 flex justify-between p-4">
                  Education{" "}
                  {
                    !publicview &&
                    <div className="flex gap-4">
                    {" "}
                    <div className=" w-auto p-2 hover:bg-slate-200 rounded-full duration-150 cursor-pointer">
                      <GoPlus
                        onClick={() => setshowediteducation(!showediteducation)}
                        />
                    </div>
                  </div>
                      }
                </div>
                {/* <TimelineComponent /> */}
                {dash.education.length !== 0 ? (
                  visibleItemsEducation.map((item, key) => (
                    <Education key={key} props={{ token: token, item: item, publicview: publicview }} />
                  ))
                ) : (
                  <div className="text-gray-500 text-md w-full text-center">
                    {" "}
                    No Education mentioned{" "}
                  </div>
                )}
                {dash.education.length > 2 && (
                  <div className="flex w-full justify-center items-center  border-slate-300">
                    <hr className="w-[30%]" />
                    <button
                      className=" border-2 p-2 rounded-3xl flex gap-2 items-center justify-center hover:bg-gray-200 focus:border-black duration-300"
                      onClick={() => setShowAllEducation(!showAllEducation)}
                    >
                      {showAllEducation
                        ? "Show Less educations"
                        : `Show All ${dash.education.length} educations`}{" "}
                      <IoIosArrowUp
                        className={showAllEducation ? "rotate-0" : "rotate-180"}
                      />
                    </button>
                    <hr className="w-[30%]" />
                  </div>
                )}
              </div>
  )
}
