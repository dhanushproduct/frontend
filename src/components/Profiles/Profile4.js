import React, { useState } from "react";
import { useForm } from "react-hook-form";
import countryData from "../../asserts/Countrylist";
import Months from "../../asserts/Months";
import { useNavigate,useParams} from "react-router-dom"
import ReLogin from "../../pages/ReLogin";
import axios from "axios";
import apiUrl from "../../apiConfig";

export default function Profile4({formdetails}) {
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [check, setcheck] = useState(false);

  const checked = () => {
    setcheck(!check);
  };
  const submited = async (data) => {
    const educationDetails = {
      levelofedu: data.levelofedu,
      field: data.field,
      school: data.school,
      city: data.city,
      country: data.country,
      fromMonth: data.Month,
      fromYear: data.year,
    };

    if (!check) {
      educationDetails.toMonth = data.toMonth;
      educationDetails.toYear = data.toyear;
    }

    // Add the education details to the formdetails object
    if (!formdetails.education) {
      formdetails.education = [];
    }
    formdetails.education.push(educationDetails);
    const education = []
    education.push(educationDetails);
    //console.log(educationDetails);
    const reqbody = {
      education : formdetails.education
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

    // //console.log(formdetails);
    navigate(`/profile/education-review/${token}`);
    window.scroll(0, 0)
  
  }

  const skip = () => {
    navigate(`/profile/page4-1/${token}`);
    window.scroll(0, 0)
  }

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedtoMonth, setSelectedtoMonth] = useState("");
  const [selectedtoYear, setSelectedtoYear] = useState("");

  if(token==null){
    return <ReLogin/>
  }else{
  return (
    <div>
      <div>
        <div className=" h-1 w-full flex">
          <div className="h-full bg-blue-900 w-[40%]"></div>
          <div className="h-full bg-white w-[60%]"></div>
        </div>
        <div className="m-4 relative">
          <div className="py-3 text-2xl font-bold font-sans">Add education</div>
          <br />
          <br />
          <div>
            <form action="" onSubmit={handleSubmit(submited)}>
              <div>
                <label htmlFor="levelofedu" className=" font-semibold">
                  Level of education <span className=" text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                  name="levelofedu"
                  required
                  {...register("levelofedu")}
                />
              </div>
              <div>
                <label htmlFor="field" className=" font-semibold">
                  Field of study
                </label>
                <input
                  type="text"
                  className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                  name="field"
                  {...register("field")}
                />
              </div>
              <div>
                <label htmlFor="school" className=" font-semibold">
                  School name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                  name="school"
                  {...register("school")}
                />
              </div>
              <div>
                <label htmlFor="city" className=" font-semibold">
                  City
                </label>
                <input
                  type="text"
                  className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                  name="city"
                  {...register("city")}
                />
              </div>
              <div>
                <label htmlFor="city" className="font-semibold">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                  name="country"
                  required
                  {...register("country")}
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">Select a country</option>
                  {countryData.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {/* education years */}
                <div>
                  <label htmlFor="city" className="font-semibold block">
                    From <span className="text-red-500">*</span>
                  </label>
                  <div className="flex justify-around">
                    <select
                      className="w-[45%] p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                      name="Month"
                      required
                      {...register("Month")}
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="">Month</option>
                      {Months[0].map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <select
                      className="w-[45%] p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                      name="Month"
                      required
                      {...register("year")}
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="">Year</option>
                      {Months[1].map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="py-3 hover:cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    onChange={checked}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-justify hover:cursor-pointer  px-2"
                  >
                    Currently enrolled
                  </label>
                </div>
                { !check && {...register("pursuing")} &&
                  <div>
                    <label htmlFor="city" className="font-semibold block">
                      To <span className="text-red-500">*</span>
                    </label>
                    <div className="flex justify-around">
                      <select
                        className="w-[45%] p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                        name="Month"
                        required
                        {...register("toMonth")}
                        value={selectedtoMonth}
                        onChange={(e) => setSelectedtoMonth(e.target.value)}
                      >
                        <option value="">Month</option>
                        {Months[0].map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      <select
                        className="w-[45%] p-2 border-b-4 border-2 text-gray-800 rounded-md my-2"
                        name="Month"
                        required
                        {...register("toyear")}
                        value={selectedtoYear}
                        onChange={(e) => setSelectedtoYear(e.target.value)}
                      >
                        <option value="">Year</option>
                        {Months[1].map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                }
              </div>
              <br />
              <div className="flex flex-row-reverse w-full justify-between">

              <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl md:w-[40%] w-[100%] my-4 md:my-0"
            onClick={()=> {window.scroll(0, 0)}}
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
    </div>
  );
  }
}
