import React, { useState } from "react";
import axios from "axios";
import { BsTelephoneInbound } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointments = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [last, setLast] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [availableTimeSlots, setAvailableTimeSlots] = useState([
    " بين 9:00 صباحاً و ال 12 ظهراً",
    " بين 12:00 ظهراً و ال 6 مساءً",
    " بين 6:00 مساءً و ال 9 مساءً",
  ]);

  const handleTimeSlotSelection = (event) => {
    const selectedTimeSlot = event.target.value;
    setTimeSlot(selectedTimeSlot);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8002/api/patients/patients", {
        name,
        number,
        service,
        message,
        city,
        last,
        timeSlot,
      })
      .then((response) => {
        if (response.status === 200) {
          setShowSuccessModal(true);
          setName("");
          setNumber("");
          setCity("");
          setService("");
          setMessage("");
          setLast("");
          setTimeSlot("");
          toast.success("! تم إرسال الطلب بنجاح"); // Display success toast
        }
      })
      .catch((error) => {
        toast.error("تأكّد من ملء جميع البيانات!"); // Display error toast
      });
  };

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center p-10"
      id="booking"
    >
      <div className="lg:w-1/2 mb-10 lg:mb-0 flex flex-col items-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 2, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 2.0 }}
          >
            {" "}
            <div className="bg-main w-fit rounded-xl">
              <h3 className="text-[32px] text-white text-center p-4">
                احجز موعد
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 2, x: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 2.0 }}
          >
            <h2 className="text-[30px] mt-6 mb-6 xs:text-center sm:text-center">
              تواصل معنا لحجز موعدك الآن
            </h2>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 2, x: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 2.0 }}
          >
            <p className="xs:text-center sm:text-center xs:mx-2 sm:mx-2 text-xl">
              يرجى ملء النموذج، وسوف نتواصل معك لتوضيح جميع التفاصيل
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-start xs:flex-col items-center gap-16 xs:gap-8 sm:gap-8 mt-6 ">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 2, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 2.0 }}
            >
              {" "}
              <div className="flex items-center">
                <div className="bg-main rounded-xl">
                  <BsTelephoneInbound className="m-2 text-white text-2xl " />
                </div>

                <h5 className="ml-2 ">+973-17773600</h5>
              </div>{" "}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:w-1/2 py-10 md:px-8 xs:px-6  bg-main rounded-xl text-right">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 3 }}
          transition={{ duration: 2.5 }}
        >
          <h1 className="text-2xl font-bold mb-4  text-white ">
            املء الاستمارة
          </h1>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="col-span-2">
              <label
                className="block  text-white  font-bold mb-2"
                htmlFor="name"
              >
                الإسم
              </label>
              <input
                className="placeholder:text-right text-[#000] shadow appearance-none border-third rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="مثـال: محمد بن عبدالله"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="text-right xs:col-span-2 md:col-span-1">
              <label
                className="block  text-white  font-bold mb-2"
                htmlFor="name"
              >
                رقم الهاتف
              </label>
              <input
                className="placeholder:text-right text-[#000] shadow appearance-none border-third rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="٩٧٣-١٧٧٧٣٦٠٠"
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
            </div>
            <div className="text-right xs:col-span-2 md:col-span-1">
              <label
                className="block text-white  font-bold mb-2"
                htmlFor="city"
              >
                المنطقة
              </label>
              <input
                className="placeholder:text-right shadow appearance-none text-[#000] border-third rounded w-full py-2 px-3  leading-tight"
                id="city"
                type="text"
                placeholder="مثـال: المنامة"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="col-span-2">
              <label
                className="block text-white  font-bold mb-2"
                htmlFor="last"
              >
                تاريخ الموعد
              </label>
              <input
                type="date"
                onChange={(e) => {
                  setLast(e.target.value);
                }}
                className="shadow appearance-none text-[#000] border-third rounded w-full py-2 px-3 text-right leading-tight"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="timeSlot" className="text-white mr-3">
                الوقت المفضّل للموعد
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={timeSlot} // Bind the selected timeSlot to the value attribute
                onChange={handleTimeSlotSelection}
                className="rounded xs:w-[100%] mt-2"
              >
                <option className="text-right" value="">
                  -- اختر الوقت الأنسب --
                </option>
                {availableTimeSlots.map((slot) => (
                  <option key={slot} value={slot} className="text-right">
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label
                className="block text-white  font-bold mb-2"
                htmlFor="message"
              >
                رسالة
              </label>
              <textarea
                className="placeholder:text-right text-[#000] shadow appearance-none border-third rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="...اترك رسالة"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2 text-white mt-4">
              <label>تأكيد تقديم طلب الموعد </label>
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="border rounded-md text-main bg-white w-full text-center"
              >
                تأكيد
              </button>
            </div>
            <ToastContainer />
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Appointments;
