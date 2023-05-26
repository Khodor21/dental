import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Healt360 from "../assets/health360.jpg";
import GlobeMed from "../assets/globemed.png";
import MedNet from "../assets/mednet.png";
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
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 2000,
      cssEase: "linear",
    };

    const logos = [
      {
        image: Healt360,
      },
      {
        image: GlobeMed,
      },
      {
        image: MedNet,
      },
    ];

    return (
      <div className="text-main bg-white" id="testimonial">
        <h3 className="text-[40px] text-main text-center mb-8 pt-4">
          معتمدون مــن{" "}
        </h3>

        {/* <p className="text-center text-[80px] text-fourth">،،</p> */}

        <div className="pb-10">
          {" "}
          <Slider {...settings}>
            {logos &&
              logos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-8"
                >
                  <img src={logo.image} className="w-50 mx-auto" />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    );
  }
}
