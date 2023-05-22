import React, { useState, useEffect } from "react";
import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsSnapchat,
  BsTelephoneInbound,
} from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import Logo1 from "../assets/almas4.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Footer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (name && phone) {
      axios
        .post("http://localhost:8002/api/patients/message", {
          name,
          phone,
        })
        .then((response) => {
          console.log(response.data);
          toast.success("! تم إرسال الطلب بنجاح"); // Display success toast
        })
        .catch((err) => {
          toast.error("!تأكّد من ملء جميع البيانات"); // Display error toast
        });
    }
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:almasclinic.bh@gmail.com";
  };
  return (
    <div
      id="footer"
      className="grid grid-cols-1 gap-6 lg:flex lg:justify-between md:grid md:grid-cols-2 md:gap-8 bg-main p-10 text-white text-left"
    >
      <div className="flex flex-col gap-6">
        <div className="flex ">
          <img src={Logo1} className="sm:h-[42px] xs:h-[42px] mr-2" />
          <h5 className="mt-2 text-white  font-extrabold">
            Almas Dental Centre
          </h5>
        </div>
        <h6 className="text-fourth w-[100%]">Feel free to contact US.</h6>
        <div className="flex items-center">
          <div className="bg-main rounded-xl">
            <HiOutlineMail className="text-2xl" />
          </div>
          <h5 className="ml-1 cursor-pointer" onClick={handleEmailClick}>
            almasclinic.bh@gmail.com
          </h5>
        </div>
        <div className="flex items-center">
          <div className="bg-main rounded-xl">
            <BsTelephoneInbound className="text-2xl" />
          </div>

          <a href="tel:+97317773600" className="ml-1">
            <h6> +973-17773600</h6>
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-6 ">
        <h5 className="text-lg border-b-2 w-fit">Pages</h5>
        <a href="#home">
          <h6>Home</h6>
        </a>
        <a href="#booking">
          <h6>Booking</h6>
        </a>
        <a href="#testimonial">
          <h6>Testimonial</h6>
        </a>
        <a href="#location">
          <h6>Location</h6>
        </a>
      </div>
      <div className="flex flex-col gap-6 ">
        <h1 className="text-lg border-b-2 w-fit">Social Media</h1>
        <a href="https://www.facebook.com/almasdentalcentre.bh">
          <p className="flex gap-2">
            <BsFacebook className="text-lg" /> Facebook
          </p>
        </a>
        <a href="https://www.instagram.com/almasdentalcentre.bh/">
          {" "}
          <p className="flex gap-2">
            <BsInstagram className="text-lg" />
            Instagram
          </p>
        </a>
        <a href="https://api.whatsapp.com/send/?phone=97338036000&text&type=phone_number&app_absent=0">
          <p className="flex gap-2">
            <BsWhatsapp className="text-lg" /> whatsapp
          </p>
        </a>

        <p className="flex gap-2">
          <BsSnapchat className="text-lg" /> SnapChat
        </p>
      </div>
      <div className="flex flex-col gap-6 ">
        <h1 className="text-lg xs:border-b-2 sm:border-b-2 w-fit">
          Subscribe to our Newsletter
        </h1>
        <p className="text-fourth w-3/4 ">
          Subscribe with your phone number to receive our last offers.
        </p>
        <div className="flex flex-col gap-4">
          <input
            className="shadow border-third rounded w-full py-2 px-3"
            id="name"
            type="text"
            placeholder="Your name here..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="shadow border-third rounded w-full py-2 px-3"
            id="phone"
            type="tel"
            placeholder="Your number here..."
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <button className="bg-white rounded shadow-lg" onClick={handleSubmit}>
            <p className="text-main m-2">Subscribe</p>
          </button>
          <ToastContainer />
        </div>{" "}
      </div>
    </div>
  );
};

export default Footer;
