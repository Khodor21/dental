import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Before1 from "../assets/before.jpg";
import Before2 from "../assets/before1.jpg";
import Before3 from "../assets/before3.jpg";

export default class Carousell extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      cssEase: "linear",
    };

    const logos = [
      {
        image: Before1,
      },
      {
        image: Before2,
      },
      {
        image: Before3,
      },
    ];

    return (
      <div className="text-white bg-main p-8" id="Before">
        <h3 className="text-4xl text-white text-center mb-8 pt-4">
          لمساتــنا السحريّـة{" "}
        </h3>

        <div className="pb-10">
          <Slider {...settings}>
            {logos &&
              logos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-8"
                >
                  <img
                    src={logo.image}
                    className="rounded-md mx-auto md:w-[50%]"
                    alt="Logo"
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    );
  }
}
