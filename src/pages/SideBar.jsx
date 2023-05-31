import React from "react";
import { BiHomeSmile } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import {
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineCalendar,
} from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo1 from "../assets/almas3.png";

const App = () => {
  return (
    <div className="bg-[#fff] ">
      <div className="h-screen w-full">
        <div className="flex flex-col gap-8 p-10 ">
          <div className="flex ">
            <img src={Logo1} className="sm:h-[42px] xs:h-[42px] mr-2" />
            <h5 className=" text-main font-extrabold">Almas Centre</h5>
          </div>{" "}
          <Link to="/home">
            <div className="flex gap-4 rounded-[4px] hover:bg-main hover:text-white">
              <div className="mt-2 mb-2 ml-2 text-lg ">
                <BiHomeSmile />
              </div>
              <h5 className="mt-1">Overview</h5>
            </div>
          </Link>
          <Link to="/patients">
            <div className="flex gap-4 rounded-[4px] hover:bg-main hover:text-white">
              <div className="mt-2 mb-2 ml-2 text-lg ">
                <BsFillPersonFill />
              </div>
              <h5 className="mt-1">Patients List</h5>
            </div>
          </Link>
          <Link to="/calendar">
            <div className="flex gap-4 rounded-[4px] hover:bg-main hover:text-white">
              <div className="mt-2 mb-2 ml-2 text-lg ">
                <AiOutlineCalendar />
              </div>
              <h5 className="mt-1">Calendar</h5>
            </div>
          </Link>
          <Link to="/message">
            <div className="flex gap-4 rounded-[4px] hover:bg-main hover:text-white">
              <div className="mt-2 mb-2 ml-2 text-lg ">
                <AiOutlineMessage />
              </div>
              <h5 className="mt-1">Messages</h5>
            </div>
          </Link>
          <Link to="/payments">
            <div className="flex gap-4 rounded-[4px] hover:bg-main hover:text-white">
              <div className="mt-2 mb-2 ml-2 text-lg ">
                <MdPayment />
              </div>
              <h5 className="mt-1">Payments</h5>
            </div>
          </Link>
          <Link to="/admin-page">
            <div className="flex gap-4 rounded-[4px] hover:bg-main hover:text-white">
              <div className="mt-2 mb-2 ml-2 text-lg ">
                <AiOutlineSetting />
              </div>
              <h5 className="mt-1">Admin</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
