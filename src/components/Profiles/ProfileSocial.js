import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../apiConfig";
export default function ProfileSocial() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  
  const submitform = async (data) => {
    const reqbody = {
      socialaccounts: data,
    };
    try {
      const response = await axios.post(
        apiUrl.profile.editprofile + token,
        reqbody
      );
      //console.log(response);
      if (response.status === 200) {
        //console.log(response.body);
        // Navigate to the next page or wherever you want
        // navigate(`/profile/page7/${id}`);
        navigate(`/profile/page8/${token}`);
      }
    } catch (err) {
      //console.log(err);
    }
    // //console.log(formdetails);
    window.scroll(0, 0);
  };
  const skip = () => {
    navigate(`/profile/page8/${token}`);
    window.scroll(0, 0)
  }

  return (
    <div>
      {" "}
      <div>
        <div className=" h-1 w-full flex">
          <div className="h-full bg-blue-900 w-[80%]"></div>
          <div className="h-full bg-white w-[20%]"></div>
        </div>
        <div className="m-4 relative">
          <div className="py-3 text-2xl font-bold font-sans">
            Drop your social account links here!
          </div>
          <br />
          <br />
          <form onSubmit={handleSubmit(submitform)}>
            <div>
              <label htmlFor="GitHub" className=" font-semibold">
                GitHub 
              </label>
              <input
                type="text"
                className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                name="GitHub"
                {...register("GitHub")}
              />
            </div>

            <div className="my-4">
              <label htmlFor="LinkedIn" className=" font-semibold">
                LinkedIn 
              </label>
              <input
                type="text"
                //   placeholder="Last Name"
                className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                name="LinkedIn"
                {...register("LinkedIn")}
              />
            </div>
            <div className="my-4">
              <label htmlFor="WebSite" className=" font-semibold">
                WebSite 
              </label>
              <input
                type="text"
                //   placeholder="Last Name"
                className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                name="WebSite"
                {...register("WebSite")}
              />
            </div>
            <div className="my-4">
              <label htmlFor="HackerRank" className=" font-semibold">
                HackerRank 
              </label>
              <input
                type="text"
                className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                name="HackerRank"
               
                {...register("HackerRank")}
              />
            </div>
            <div className="my-4">
              <label htmlFor="CodeChef" className=" font-semibold">
                CodeChef 
              </label>
              <input
                type="text"
                //   placeholder="Last Name"
                className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                name="CodeChef"
                
                {...register("CodeChef")}
              />
            </div>
            <div className="flex flex-row-reverse pt-4 w-full justify-between">

              <button
                type="submit"
                onClick={() => {
                  window.scroll(0, 0);
                }}
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
    </div>
  );
}
