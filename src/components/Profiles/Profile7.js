import React, { useState } from "react";
import currentrole from "../../asserts/Currentrole";
import { useNavigate ,useParams} from "react-router-dom";
import axios from "axios";
import ReLogin from "../../pages/ReLogin";
import apiUrl from "../../apiConfig";

export default function Profile7({ formdetails }) {

  const token = localStorage.getItem("token");
  
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const saveRoleAndContinue = async () => {
    if (selectedRole) {
      formdetails.currentRole = selectedRole;

      const reqbody = {
        currentRole : selectedRole
      }
    try{
      const response = await axios.post(apiUrl.profile.editprofile + token,reqbody);
      //console.log(response)
      if(response.status == 200){
        //console.log(response.body);
        // Navigate to the next page or wherever you want
        // navigate(`/profile/page7/${id}`);     
        navigate(`/profile/page7-1/${token}`);
       }
    }catch(err){
      //console.log(err);
    }
      // //console.log(formdetails);
      window.scroll(0, 0);
    }
  };

  if(token==null){
    return <ReLogin/>
  }else{
  return (
    <div>
      <div className="h-1 w-full flex">
        <div className="h-full bg-blue-900 w-[72%]"></div>
        <div className="h-full bg-white w-[18%]"></div>
      </div>
      <div className="m-4 relative">
        <div className="py-3 text-2xl font-bold font-sans">
          What's your current role?
        </div>
        {currentrole.map((item, key) => (
          <div key={key} className="py-1 px-3">
            <input
              type="radio"
              name="role"
              id={item}
              value={item}
              checked={selectedRole === item}
              onChange={handleRoleChange}
              className="mx-2"
            />
            <label htmlFor={item} onClick={() => setSelectedRole(item)}>
              {item}
            </label>
          </div>
        ))}
        <br />
        <div className="flex flex-row-reverse ">
          <button
            onClick={saveRoleAndContinue}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl md:w-[40%] w-[100%] my-4 md:my-0"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
   }
}
