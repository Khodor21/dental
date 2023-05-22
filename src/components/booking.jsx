import React from "react";

const Booking = ({ PatientName, index, Service, Time }) => {
  return (
    <div className="">
      <div className="flex flex-col pt-4 gap-8">
        <div className="border-b-2 border-fourth w-full pb-2">
          {index}
          <h5 className="w- text-main">Name: {PatientName}</h5>
          <h5 className="text">Service: {Service}</h5>
          <h5 className="text-third mt-2">Time: {Time}</h5>
        </div>
      </div>
    </div>
  );
};

export default Booking;
