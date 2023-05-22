import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
const NavSide = ({ onCloseNav }) => {
  const handleCloseNav = () => {
    onCloseNav();
  };
  return (
    <div className="">
      <div className="bg-[#ffff] border-l border-main shadow-lg xs:w-[50%] md:w-[35%] absolute right-0 top-0 ">
        <div className="h-screen w-full">
          <div className="flex flex-col items-end  gap-6 p-10 ">
            <div
              className="text-2xl text-main relative z-10"
              onClick={handleCloseNav}
            >
              <AiOutlineClose />
            </div>

            <a href="/" className="hover:text-main">
              الرئيسية
            </a>
            <a href="#booking" className="hover:text-main">
              حجز موعد
            </a>
            <a href="#Team" className="hover:text-main">
              فريقنا
            </a>
            <a href="#footer" className="hover:text-main">
              تواصل معنا
            </a>
            <a href="#testimonial" className="hover:text-main">
              آراء المراجعــين
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavSide;
