import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams} from "react-router-dom";
import countryData from "../../asserts/Countrylist";
import ReLogin from "../../pages/ReLogin";
import axios from "axios";
import apiUrl from "../../apiConfig";

export default function Profile3({formdetails}) {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  const [selectedCountry, setSelectedCountry] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitform = async (data) => {
    formdetails.Location = data;
    //console.log(data)
    //console.log(formdetails)
    const reqbody = {
      Location : data
    }
    try{
      const response = await axios.post(apiUrl.profile.editprofile + token,reqbody);
      //console.log(response)
      if(response.status == 200){
        //console.log(response.body);
        navigate(`/profile/page4/${token}`);
      }
    }catch(err){
      //console.log(err);
    }
    // //console.log(data);
    window.scroll(0, 0)
  };
  if(token==null){
    return <ReLogin/>
  }else{
  return (
    <div>
      <div className=" h-1 w-full flex">
        <div className="h-full bg-blue-900 w-[32%]"></div>
        <div className="h-full bg-white w-[68%]"></div>
      </div>
      <div className="m-4 relative">
        <div className="py-3 text-2xl font-bold font-sans">
          Where are you located?
        </div>
        <div>This helps match you with nearby jobs</div>
        <br />
        <form onSubmit={handleSubmit(submitform)}>
          <div className="dropdowninput">
            <div className="my-4">
              <label htmlFor="city" className="font-semibold">
              Country <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                name="country"
                required
                {...register("Country")}
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)} 
              >
                <option value="" >
                  Select a country
                </option>
                {countryData.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="streetadd" className=" font-semibold">
              Street address{" "}
            </label>
            <input
              type="text"
              className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
              name="streetadd"
              {...register("StreetAddress")}
            />
          </div>
          <div className="my-4">
            <label htmlFor="city" className=" font-semibold">
              City <span className=" text-red-500">*</span>
            </label>
            <input
              type="text"
              //   placeholder="Last Name"
              className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
              name="city"
              required
              {...register("City")}
            />
          </div>
          <div className="my-4">
            <label htmlFor="pincode" className=" font-semibold">
              Pincode
            </label>
            <input
              type="text"
              //   placeholder="Last Name"
              className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
              name="pincode"
              {...register("PinCode")}
            />
          </div>
          <div className="flex flex-row-reverse">
          <button
            type="submit"
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
