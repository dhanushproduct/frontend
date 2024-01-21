import React, {useState} from "react";
import HeroSection from "../components/HeroSection";
import Roles from "../components/Roles";
export default function Landing() {
 
  return (
    <div>
      <div className="w-full flex justify-center ">
        <div className="w-[95%] bg-gradient-to-r from-[#eaf3fd] to-[#ffebdd] p-4 rounded-3xl flex justify-evenly flex-col md:flex-row">
          {/* left text */}
          <div className="h-full flex items-center p-4 m-4">
            <div>
              <div className=" font-semibold text-[2.5rem]">
                Accelerating Technology Modernization
              </div>

              <div className="text-lg">
                Our purpose is to empower businesses to create amazing
                experiences for customers.
                <br />
                Our vision is to become a leading technology services partner
                for the world's most innovative companies.
              </div>
            </div>
          </div>
          <div>
            <HeroSection />
          </div>
        </div>
      </div>
      <div className="p-4 m-4 text-center">
        <div className="md:text-5xl text-3xl md:mt-6 mt-4 font-bold  md:leading-[60px]">
          No need to struggle <br /> alone anymore
        </div>
      </div>
      <Roles/>




    </div>
  );
}
