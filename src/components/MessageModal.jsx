import React from "react";
import { FaUserNurse } from "react-icons/fa";
import { BiMessageSquareDots, BiTimeFive } from "react-icons/bi";
const Modal = ({ toggleModal, message, name, time }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="fixed inset-0 bg-[#00000911]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg overflow-hidden transform transition-all sm:max-w-lg sm:w-full">
            <div className="flex flex-col gap-2 p-4 text-main">
              <div className="flex gap-2">
                <FaUserNurse className="text-[#000] mt-1" />
                <h5>{name}</h5>
              </div>
              <h6 className="flex gap-2">
                <BiMessageSquareDots className="text-[#000] mt-1" />
                <div className="text-[#000]">Message:</div> {message}
              </h6>
              <h6 className="flex gap-2">
                <BiTimeFive className="text-[#000] font-extrabold mt-1" />
                <div className="text-[#000]">Preferred Time:</div> {time}
              </h6>
            </div>
            <div className="flex justify-end p-4 ">
              <button
                onClick={toggleModal}
                className="text-white rounded-md bg-main"
              >
                <h6 className="mx-2 ">Close</h6>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
