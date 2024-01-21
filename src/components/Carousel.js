import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../styles/carousel.css";
import { carouseldata } from "../jsonfiles/carouseldata";

export default function Carousel() {
  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    smartSpeed: 450,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  };
  return (
    <OwlCarousel
      id="customer-testimonoals"
      className="owl-carousel owl-theme z-0"
      {...options}
    >
      {carouseldata.map((item, index) => (
        <div key={index}>
          <div className="item h-full z-0">
            <div className="w-full h-[50vh] m-4 p-3 px-3 bg-gray-500 z-0 rounded-lg">
              <br />
              <h1 className="text-[2rem]">{item.question}</h1>
              <br />
              <br />
              <h3 className="text-[1rem]">{item.answer}</h3>
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
}
