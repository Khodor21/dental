import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfWeek,
  startOfToday,
  getDay,
} from "date-fns";
import React, { useState } from "react";
import axios from "axios";
import Booking from "./booking";

const Calender = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = startOfToday();

  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [name, setName] = useState([]);
  const [length, setLength] = useState([]);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const handleDateClick = async (date) => {
    try {
      await axios
        .get(`http://localhost:8002/api/patients/getallpatients?date=${date}`)
        .then((res) => {
          setName(res.data.patients);
          setLength(res.data.patients.length);
        })
        .catch((err) => {
          console.error(err);
        });

      setSelectedDate(date); // Add this line to update the selectedDate state
    } catch (error) {
      console.error(error);
    }
  };

  function nextMonth() {
    let firstDayNexttMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNexttMonth, "MMM-yyyy"));
  }
  function previousMonth() {
    let firstDayNexttMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNexttMonth, "MMM-yyyy"));
  }

  return (
    <div className="flex gap-x-40">
      <div>
        <div className="flex justify-between mb-2">
          <button
            onClick={previousMonth}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            &lt;
          </button>

          {/* Month */}
          <h5 className="text-lg font-semibold text-main">
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </h5>

          <button
            onClick={nextMonth}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            &gt;
          </button>
        </div>

        {/* Week */}

        <div className="grid grid-cols-7 gap-14 ">
          {weekdays.map((weekday) => (
            <h6
              key={weekday}
              className="w-full py-2 text-md font-medium text-gray-600 text-center "
            >
              {weekday}
            </h6>
          ))}
        </div>

        {/* Day */}
        <div className="grid grid-cols-7 gap-14 cursor-pointer mt-2">
          {days.map((day, dayIdx) => (
            <h5
              key={day.toString()}
              className={`w-1/7 py-2 text-md font-medium text-gray-900 text-center ${
                format(day, "MM") !== format(firstDayCurrentMonth, "MM")
                  ? "text-[#abaeb3]"
                  : "text-gray-900"
              } ${
                selectedDate.toDateString() === day.toDateString()
                  ? " bg-main rounded-full w-10 text-white"
                  : ""
              } ${dayIdx === 0 && colStartClasses[getDay(day)]}`}
              onClick={() => handleDateClick(day)}
            >
              {format(day, "d")}
            </h5>
          ))}
        </div>
      </div>
      <div className="">
        <div className="flex justify-between">
          <h5 className="text-main pt-2 pb-2 text-2xl ">
            Patient List For {selectedDate.toDateString()}
          </h5>
        </div>
        {name &&
          name.map((nm, index) => (
            <div className="" key={index.name}>
              <Booking
                PatientName={nm.name}
                Service={nm.service}
                Time={nm.timeSlot}
              />
            </div>
          ))}
        <h5 className="">
          Total Patients For Today:
          <h6 className="ml-1 text-main font-bold text-lg">{length}</h6>
        </h5>
      </div>
    </div>
  );
};

export default Calender;

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
