import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="mb-16 mt-4 rounded-lg">
      <Slider {...settings}>
        <div className=" bg-slate-500 h-[350px] rounded-lg mt-4 ">
          <div className="flex w-full h-full justify-center items-center">
            <text className="text-xl font-semibold ">Promotion Banner One</text>
          </div>
        </div>
        <div className="bg-red-500 h-[350px] rounded-lg mt-4">
          <div className="flex w-full h-full justify-center items-center">
            <text className="text-xl font-semibold ">Promotion Banner Two</text>
          </div>
        </div>
        <div className="bg-lime-500 h-[350px] rounded-lg mt-4">
          <div className="flex w-full h-full justify-center items-center">
            <text className="text-xl font-semibold text-black ">
              Promotion Banner Three
            </text>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HomeSlider;
