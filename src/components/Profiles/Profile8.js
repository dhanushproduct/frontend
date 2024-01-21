import React, { useState } from "react";
import WorkLocation from "../../asserts/WorkLocation";
import { GrAdd } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { ImBin } from "react-icons/im";
import ReLogin from "../../pages/ReLogin";
import axios from "axios";
import apiUrl from "../../apiConfig";

export default function Profile8({ formdetails }) {


  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const submitbut = async () => {
    formdetails.WorkLocation = skil;

    const reqbody = {
      WorkLocation: formdetails.WorkLocation
    }
    //console.log(reqbody)
    try{
      const response = await axios.post(apiUrl.profile.editprofile + token,reqbody);
      //console.log(response)
      if(response.status == 200){
        //console.log(response.body);
        // Navigate to the next page or wherever you want
        navigate(`/profile/page9/${token}`);     
       }
    }catch(err){
      //console.log(err);
    }
    window.scroll(0, 0);
  };
  const [iniskills, setiniskills] = useState(WorkLocation);
  const [skil, setskills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (e) => {
    const location = e.target.value;
    if (location) {
      if (!skil.includes(location)) {
        setskills([...skil, location]);
        setiniskills((prev) => prev.filter((item) => item !== location));
        setSelectedLocation(""); // Clear the selected location after adding
      }
    }
  };

  const delitem = (itemToDelete) => {
    const updatedSkills = skil.filter((item) => item !== itemToDelete);
    setskills(updatedSkills);
    setiniskills([...iniskills, itemToDelete]);
  };

  if(token==null){
    return <ReLogin/>
  }else{
  return (
    <div>
      <div className="h-1 w-full flex">
        <div className="h-full bg-blue-900 w-[88%]"></div>
        <div className="h-full bg-white w-[12%]"></div>
      </div>
      <div className="m-4 relative p-2">
        <div className="py-3 text-2xl font-bold font-sans">
          What are some of your Work Locations?
        </div>
        <div className="text-sm">We recommend at least 4 Work Locations</div>
        <br />
        <div className="w-full h-[40vh] border-2 rounded-2xl  overflow-y-auto">
          <ul className="flex flex-wrap p-4">
            {skil.map((item, key) => (
              <li
                className="hover:bg-blue-900 duration-300 hover:scale-110 hover:text-white m-4 cursor-pointer border-2 p-2 rounded-xl flex justify-center items-center gap-1"
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
        <select
          className="w-full p-2 border-2  rounded-xl"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <option value="" disabled>
            Select a location
          </option>
          {iniskills.map((item, key) => (
            <option key={key} value={item}>
              {item}
            </option>
          ))}
        </select>
        <br /><br />
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
  );
   }
}
