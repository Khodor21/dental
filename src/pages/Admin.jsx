import React, { useState } from "react";
import axios from "axios";
const Admin = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [last, setLast] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [price, setPrice] = useState("");
  const [paymentN, setPaymentN] = useState("");
  const [service, setService] = useState("");

  const availableTimeSlots = [
    " بين 9:00 صباحاً و ال 12 ظهراً",
    " بين 12:00 ظهراً و ال 6 مساءً",
    " بين 6:00 مساءً و ال 9 مساءً",
  ];

  const handleTimeSlotSelection = (event) => {
    const selectedTimeSlot = event.target.value;
    setTimeSlot(selectedTimeSlot);
    setAvailableTimeSlots((prevSlots) =>
      prevSlots.filter((slot) => slot !== selectedTimeSlot)
    );
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
        price,
      })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };
  const paymentsSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8002/api/patients/payments", {
        service,
        price,
        paymentN,
      })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="bg-[#f3f2f2]">
      <h5 className="text-center text-3xl pt-10 text-main">
        Admin Registration
      </h5>
      <h6 className="text-center text-xl pt-4 text-third mx-10">
        {" "}
        "This page is used by the admin to register any patient who registers
        either by phone or directly at the clinic."
      </h6>
      <div className="flex justify-between items-center gap-8 p-10">
        <div className="lg:w-1/2 p-10 bg-main rounded-xl text-right ">
          {" "}
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
            <div className="text-right">
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
            <div>
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
                className="shadow appearance-none text-[#000] border-third rounded w-full py-2 px-3  leading-tight"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="timeSlot" className="text-white mr-3">
                الوقت المفضّل للموعد
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
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
            <div className="flex flex-col gap-2 col-span-2 text-white mt-4">
              <label>تأكيد تقديم طلب الموعد </label>
              <input
                type="submit"
                onSubmit={handleSubmit}
                className="border rounded-md text-main bg-white w-full text-center cursor-pointer"
              />
            </div>
          </form>
        </div>
        <div className="lg:w-1/2 p-10 bg-main rounded-xl text-right h-fit ">
          {" "}
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
                  setPaymentN(e.target.value);
                }}
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-white  font-bold mb-2"
                htmlFor="service"
              >
                الخدمة
              </label>
              <input
                onChange={(e) => {
                  setService(e.target.value);
                }}
                className="placeholder:text-right shadow appearance-none text-[#000] border-third rounded w-full py-2 px-3  leading-tight"
              />
            </div>

            <div className="col-span-2">
              <label
                className="block text-white  font-bold mb-2"
                htmlFor="last"
              >
                المبلغ المدفوع
              </label>
              <input
                type="number"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="shadow appearance-none text-[#000] border-third rounded w-full py-2 px-3  leading-tight"
              />
            </div>

            <div className="flex flex-col gap-2 col-span-2 text-white mt-4">
              <label>تأكيد الدفع </label>
              <input
                type="submit"
                onSubmit={paymentsSubmit}
                className="border rounded-md text-main bg-white w-full text-center cursor-pointer"
              />
            </div>
          </form>
        </div>{" "}
      </div>
    </div>
  );
};

export default Admin;
