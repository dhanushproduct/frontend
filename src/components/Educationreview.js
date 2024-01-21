import React, { useEffect, useState } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Educationreview({ formdetails }) {
  const {id} = useParams();
  const token = localStorage.getItem("token")
  const navigate = useNavigate();

  // Initialize educationData as an empty array if it's undefined in formdetails
  const educationData = formdetails.education || [];
  const [edudetails, seteducationdetails] = useState(educationData);

  const editEducation = (index) => {
    // Navigate to the education editing page (Profile4) with the index of the education item to edit
    navigate(`/profile/page4-1/${id}`);
  };

  const deleteEducation = (index) => {
    // Create a new array that excludes the education item at the specified index
    const updatedEducationData = educationData.filter((_, i) => i !== index);

    // Update the formdetails object (if needed)
    // ...

    // Update the educationData state with the modified array
    seteducationdetails(updatedEducationData);
  };

  useEffect(() => {
    seteducationdetails(educationData);
  }, [educationData]);

  return (
    <div>
      <div className=" h-1 w-full flex">
        <div className="h-full bg-blue-900 w-[40%]"></div>
        <div className="h-full bg-white w-[60%]"></div>
      </div>
      <div className="m-2 p-2">
        <h2 className="py-3 text-2xl font-bold font-sans text-center">
          Education Review
        </h2>
        <br />
        <ul>
          {edudetails.map((education, index) => (
            <li
              key={index}
              className="p-4 m-2 bg-slate-100 rounded-md uppercase flex flex-wrap justify-between break-all"
            >
              <div className="w-[80%]">
                <div className="text-xl uppercase font-semibold ">
                  {education.school}
                </div>
                <div>
                  {education.levelofedu}, {education.field}
                </div>
                <div></div>
                <div>{education.city}</div>
                <div className="flex gap-1 ">
                  <div>
                    {education.fromMonth.slice(0, 3)} {education.fromYear} -
                  </div>
                  {education.toMonth && education.toYear && (
                    <div>
                      {education.toMonth.slice(0, 3)} {education.toYear}
                    </div>
                  )}
                  {!education.toMonth && !education.toYear && <div>Present</div>}
                </div>
              </div>
              <div className="gap-3 flex">
                {/* <button onClick={() => editEducation(index)}>
                  <AiFillEdit size={25} />
                </button> */}
                <button onClick={() => deleteEducation(index)}>
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
            onClick={() => navigate(`/profile/page4/${token}`)}
          >
            <IoIosAddCircleOutline size={20} /> Add Education
          </button>
          <button
            className="bg-blue-800 hover:bg-blue-900 duration-300 text-white font-bold py-2 px-4 rounded-xl"
            onClick={() => navigate(`/profile/page4-1/${token}`)}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
