import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";

const PatientsHome = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios
      .get("http://localhost:8002/api/patients/getallpatients")
      .then((response) => {
        const allPatients = response.data.patients;
        const last20Patients = allPatients.slice(-20).reverse(); // Slice the last 20 patients and reverse the order
        setPatients(last20Patients);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 rounded-lg bg-[#fff] text-main overflow-x-scroll">
        <h5 className="text-[#000] font-bold">Last 20 Appointments</h5>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-[#000]">
              <th>Nb.</th>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className="text-main border-b border-[#000]">
                <td>{index + 1}-</td>
                <td className="py-2 text-sm">{patient.name}</td>
                <td className="py-4">{patient.last.substring(5, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsHome;
