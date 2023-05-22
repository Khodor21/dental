import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Avatar from "../assets/avatar1.jpg";
import Avatar2 from "../assets/avatar2.jpg";
import Avatar3 from "../assets/avatar3.jpg";
import Avatar4 from "../assets/avatar4.jpg";

export default class Carousell extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 4000,
      cssEase: "linear",
    };

    const testimoniall = [
      {
        name: "samimaani4828",
        description:
          "     الدكتور أديب خبرة طويلة وخاصة بزراعة الاسنان ماشاء الله أخلاق وتعامل رائع",
        image: Avatar,
      },
      {
        name: "basem.awwad.967",
        description:
          "دكتور أديب ماشاء الله عليك علم وأخلاق رفيعة وخبرة في مجال عملك حفظك الله بالتوفيق وإلى الأمام",
        image: Avatar2,
      },
      {
        name: "_teachermasooma",
        description:
          "ماشاء الله ونعم الأطباء وحسن الادارة وجميع الكوادر مركز ألماس تحية من استاذة معصومة السيّد إلى الدكتور أديب ودكتورة ابرار والبنات الشابات على حسن المعاملة ورقيها",
        image: Avatar3,
      },
      {
        name: "zainabalnooh",
        description: "جربت التنظيف عندهم...خدماتهم ومعاملاتهم ممتازة",
        image: Avatar4,
      },
    ];

    return (
      <div className="text-white bg-main" id="testimonial">
        <h3 className="text-[40px] text-white text-center mb-8 pt-4">
          آراء المراجعــين
        </h3>

        <h1 className="text-xl text-center pt-2 text-white ">
          انظر ماذا يقول عنّا ما يزيد عن 1000 مراجع
        </h1>
        <p className="text-center text-[80px] text-fourth">،،</p>

        <div className="pb-10">
          {" "}
          <Slider {...settings}>
            {testimoniall &&
              testimoniall.map((opinion, idx) => (
                <div key={idx} className="flex flex-col gap-8 text-center">
                  <img
                    src={opinion.image}
                    className="rounded-full w-14 mx-auto my-2  "
                  />
                  <h1 className="mb-2">{opinion.name}</h1>
                  <p className="mx-2">{opinion.description} </p>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    );
  }
}
