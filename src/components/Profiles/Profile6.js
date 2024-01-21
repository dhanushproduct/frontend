import React, { useState } from "react";
import skills from "../../asserts/Skills";
import { GrAdd } from "react-icons/gr";
import { useNavigate ,useParams} from "react-router-dom";
import ReLogin from "../../pages/ReLogin";
import { ImBin } from "react-icons/im";
import axios from "axios";
import apiUrl from "../../apiConfig";

export default function Profile6({ formdetails }) {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const submitbut = async () => {
    // navigate(`/profile/page7/${token}`);
    // formdetails.skills = skil;
    // //console.log(formdetails);
    const reqbody = {
      skills : skil
    }

    try{
      const response = await axios.post(apiUrl.profile.editprofile + token,reqbody);
      //console.log(response)
      if(response.status == 200){
        //console.log(response.body);
        // Navigate to the next page or wherever you want
        navigate(`/profile/page7/${token}`);     
       }
    }catch(err){
      //console.log(err);
    }

    window.scroll(0, 0);
  };
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

  if(token==null){
    return <ReLogin/>
  }else{
  return (
    <div>
      <div className="h-1 w-full flex">
        <div className="h-full bg-blue-900 w-[64%]"></div>
        <div className="h-full bg-white w-[36%]"></div>
      </div>
      <div className="m-4 relative p-2">
        <div className="py-3 text-2xl font-bold font-sans">
          What are some of your skills?
        </div>
        <div className="text-sm">We recommend at least 4 skills</div>
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
          <form onSubmit={handleFormSubmit} >
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
  );
  }
}
