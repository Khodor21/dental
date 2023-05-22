import React, { useState, useEffect } from "react";
import PaymentsTool from "../components/paymentsTool";
import axios from "axios";
const Payments = () => {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8002/api/patients/getallpatients")
      .then((response) => {
        setPatient(response.data.patients);
        console.log(response.data.patients);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <h5 className="mb-8 pt-10 text-main text-2xl">Recent Income</h5>
        {patient.map((patient, index) => (
          <div className="" key={index}>
            <PaymentsTool
              name={patient.name}
              price="90"
              last={patient.last}
              index={index}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Payments;
