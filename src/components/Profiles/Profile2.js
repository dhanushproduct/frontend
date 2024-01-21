import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate,useParams} from "react-router-dom"
import ReLogin from "../../pages/ReLogin";
import axios from "axios";
import apiUrl from "../../apiConfig";

export default function Profile2({formdetails}) {

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitform = async (data) => {
    formdetails.FullName = data;
    //console.log(data);
    data["DisplayFirstName"] = data.FirstName
    data["DisplayLastName"] = data.LastName
    const reqbody = {
      FullName : data,
    }
    try{
      const response = await axios.post(apiUrl.profile.editprofile + token,reqbody);
      //console.log(response)
      if(response.status == 200){
        // //console.log(response.body);
        navigate(`/profile/page3/${token}`)
      }
    }catch(err){
      //console.log(err);
    }
    window.scroll(0, 0)
  };

  if(token==null){
    return <ReLogin/>
  }
  else{
  return (
    <div>
      <div className=" h-1 w-full flex">
        <div className="h-full bg-blue-900 w-[24%]"></div>
        <div className="h-full bg-white w-[76%]"></div>
      </div>
      <div className="m-4 relative">
        <div className="py-3 text-2xl font-bold font-sans">
          What is your name?
        </div>
        <br />
        <br />
        <form onSubmit={handleSubmit(submitform)}>
          <div>
            <label htmlFor="firstname" className=" font-semibold">
              First Name <span className=" text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
              name="firstname"
              required
              {...register("FirstName")}
            />
          </div>
          <div className="my-4">
            <label htmlFor="firstname" className=" font-semibold">
              Last Name <span className=" text-red-500">*</span>
            </label>
            <input
              type="text"
            //   placeholder="Last Name"
              className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
              name="lastname"
              required
              {...register("LastName")}
            />
          </div>
          <div className="flex flex-row-reverse pt-4">

          <button
            type="submit"
            onClick={() => {window.scroll(0, 0)}}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl md:w-[40%] w-[100%] my-4 md:my-0"
            >
           Save & Continue
          </button>
            </div>
        </form>
      </div>
    </div>
  );
  }
}
