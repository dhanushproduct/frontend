import React, { useEffect, useState } from "react";
import ChatBubble from "./Chatbubble";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import jobseeker from "../asserts/jobseeker.png"
import employer from "../asserts/employer.png"
import { Carousel} from "keep-react"

export default function Phonemockup() {
  const options = {
    loop: true,
    center: true,
    items: 1,
    margin: 0,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 450,
    nav: false,
  };
  //   const text = 'ARE YOU A JOB SEEKER?';
  //   const [animatedText, setAnimatedText] = useState('');

  //   useEffect(() => {
  //     const animateText = () => {
  //       let index = 0;
  //       const intervalId = setInterval(() => {
  //         if (index < text.length) {
  //           setAnimatedText((prevText) => prevText + text[index]);
  //           index++;
  //         } else {
  //           clearInterval(intervalId);
  //         }
  //       }, 500); // Half-second (500 milliseconds) delay between letters
  //     };

  //     animateText();
  //   }, []);

  return (
    <div className="">
      <div className="flex justify-end pr-4 mr-3">
        <div className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[470px] w-[270px] ">
          <div className="absolute top-[4px] left-[110px] w-[15px] h-[15px] bg-black rounded-full "></div>
          <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
          <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-100 pt-[60px] grid grid-cols-1 gap-4">
          <Carousel className="bg-salte-300 ">
            <img src={jobseeker} alt=""  className="h-full" />
            <img src={employer} alt="" className="h-full" />
          </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
