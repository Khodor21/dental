import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, getDay, parse, startOfWeek, isWithinInterval } from "date-fns";
import { enUS } from "date-fns/locale";
import axios from "axios";
import "../calendar.css"; // Import your custom CSS file

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
  formats: {
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, "h:mm A", culture),
    eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
      `${localizer.format(start, "h:mm A", culture)} - ${localizer.format(
        end,
        "h:mm A",
        culture
      )}`,
    dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
      `${localizer.format(start, "MMMM d, yyyy", culture)} - ${localizer.format(
        end,
        "MMMM d, yyyy",
        culture
      )}`,
  },
});

function Test() {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8002/api/patients/getAllPatients"
      );
      const data = response.data.patients;

      if (Array.isArray(data)) {
        const mappedEvents = data.map((item) => ({
          title: item.name,
          start: new Date(item.last),
          end: new Date(item.last),
        }));
        setAllEvents(mappedEvents);
      } else {
        console.error("Invalid data structure: Expected an array");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Define the start and end times for the calendar view
  const minTime = new Date();
  minTime.setHours(9, 0, 0); // Set to 9:00 AM

  const maxTime = new Date();
  maxTime.setHours(21, 0, 0); // Set to 9:00 PM

  return (
    <div className="bg-[#ffff] text-main font-main w-full pr-8 ">
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        className="h-[150%] w-full my-[50px] pb-8"
        min={minTime}
        max={maxTime}
        step={15} // Duration of each time slot in minutes
      />
    </div>
  );
}

export default Test;
