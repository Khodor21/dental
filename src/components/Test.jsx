import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, getDay, parse, startOfWeek, isSameDay } from "date-fns";
import { enUS } from "date-fns/locale";
import axios from "axios";
import "../calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
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
      console.log(data);

      if (Array.isArray(data)) {
        const mappedEvents = data.map((item) => {
          const appointmentTime = item.appointmentTime?.trim() || "";
          const appointmentDate = item.last
            ? new Date(item.last.split("T")[0])
            : null;

          console.log("Raw appointmentTime:", appointmentTime);

          // Skip the event if appointmentTime is empty or appointmentDate is null
          if (!appointmentTime || !appointmentDate) {
            return null;
          }

          // Parse the appointmentTime string into a Date object
          const parsedAppointmentTime = parse(
            appointmentTime,
            "h:mm aa",
            new Date()
          );

          console.log("Parsed appointmentTime:", parsedAppointmentTime);

          // Combine the appointment date and time
          const combinedDateTime = new Date(
            appointmentDate.getFullYear(),
            appointmentDate.getMonth(),
            appointmentDate.getDate(),
            parsedAppointmentTime.getHours(),
            parsedAppointmentTime.getMinutes()
          );

          console.log("Combined DateTime:", combinedDateTime);

          // Format the combinedDateTime into a displayable time string
          const formattedAppointmentTime = format(combinedDateTime, "h:mma", {
            locale: enUS,
          });

          return {
            title: item.name,
            appointmentTime: formattedAppointmentTime,
            start: combinedDateTime,
            end: combinedDateTime,
          };
        });

        // Remove any null values from the mappedEvents array
        const filteredEvents = mappedEvents.filter((event) => event !== null);

        console.log(filteredEvents);
        setAllEvents(filteredEvents);
      } else {
        console.error("Invalid data structure: Expected an array");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Custom event component
  const EventComponent = ({ event }) => (
    <div className="bg-main">
      <strong className="bg-main">{event.title}</strong>
      <br />
      {event.appointmentTime}
    </div>
  );

  return (
    <div className="bg-[#ffff] text-main font-main w-full p-8">
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        views={["month", "week", "day"]}
        defaultView="month"
        components={{
          eventWrapper: ({ event, children }) => (
            <div className="bg-main">{children}</div>
          ),
        }}
        min={new Date(0, 0, 0, 9, 0)} // Adjusted with correct time values
        max={new Date(0, 0, 0, 21, 0)} // Adjusted with correct time values
        step={15}
      />
    </div>
  );
}

export default Test;
