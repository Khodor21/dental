import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsTelephoneInbound } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logo1 from "../assets/almas3.png";
import NavSide from "./NavSide";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  const handleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 2, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1.5 }}
        >
          <nav className="pt-10 px-6 relative z-10 ">
            <div className="flex justify-between items-center">
              <div className="flex pl-4">
                <img
                  src={Logo1}
                  className="sm:h-[42px] xs:h-[42px] mr-2"
                  alt="Logo"
                />
                <h5 className="mt-2 text-main font-extrabold">
                  Almas Dental Centre
                </h5>
              </div>
              <div className="lg:flex gap-14 hidden flex-row-reverse">
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
              <div>
                <button className="bg-white rounded-xl shadow-xl text-main lg:flex hidden">
                  <a href="tel:+97317773600">
                    <h5 className="my-2 mx-4 flex gap-2">
                      <BsTelephoneInbound />
                      +973-17773600
                    </h5>
                  </a>
                </button>
                <button className="lg:hidden" onClick={handleNav}>
                  {showNav ? (
                    <div className="flex flex-col">
                      <div className="navbar-container">
                        <NavSide onCloseNav={handleNav} />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <HiOutlineMenuAlt3 className="text-3xl text-main" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </nav>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
