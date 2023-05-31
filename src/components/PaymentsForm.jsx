import React, { useState } from "react";
import axios from "axios";
const PaymentsForm = () => {
  const [paymentName, setPaymentN] = useState("");
  const [service, setService] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");

  const paymentsSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8002/api/patients/payments", {
        paymentName,
        service,
        price,
        note,
        date,
      })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <h5 className="text-white text-center">Patient Payment</h5>{" "}
      <form className="grid grid-cols-2 gap-4" onSubmit={paymentsSubmit}>
        <div className="col-span-2">
          <label className="block  text-white  font-bold mb-2" htmlFor="name">
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
          <label className="block text-white  font-bold mb-2" htmlFor="service">
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
          <label className="block text-white  font-bold mb-2" htmlFor="last">
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
        <div className="col-span-2">
          <label className="block text-white  font-bold mb-2" htmlFor="last">
            تاريخ الموعد
          </label>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="shadow appearance-none text-[#000] border-third rounded w-full py-2 px-3  leading-tight placeholder:text-left"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-white  font-bold mb-2" htmlFor="last">
            ملاحظة{" "}
          </label>
          <input
            type="text"
            onChange={(e) => {
              setNote(e.target.value);
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
    </div>
  );
};

export default PaymentsForm;
