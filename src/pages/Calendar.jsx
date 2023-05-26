import React from "react";
import Calender from "../components/calender";
import Booking from "../components/booking";

const Calendar = () => {
  return (
    <div className="grid grid-cols-4 p-10 bg-[#f3f2f2]" id="booking">
      <div className="col-span-3">
        <Calender />
      </div>
    </div>
  );
};

export default Calendar;
