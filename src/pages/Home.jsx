import React, { useEffect, useState } from "react";
import axios from "axios";
import Message from "./Message";
import { BsFillPersonFill } from "react-icons/bs";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  const [monthNumber, setMonthNumber] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8002/api/patients/getmonthpatients")
      .then((res) => {
        setMonthNumber(res.data.appointmentsByMonth);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setChartData({
      labels: monthNumber.map((patient) => patient._id),
      datasets: [
        {
          label: "Patients",
          data: monthNumber.map((patient) => patient.totalAppointments),
          borderColor: "#5E3B97",
          backgroundColor: "#5E3B97",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Yearly Revenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  console.log(monthNumber);
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    fetchPatients();
  }, []);
  const fetchPatients = () => {
    axios
      .get("http://localhost:8002/api/patients/getallpatients")
      .then((response) => {
        setPatients(response.data.patients);
        console.log(response.data.patients);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="w-full pt-10">
        <div className="grid grid-cols-2 py-4 px-6">
          <Message />

          <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto py-4 px-10 border rounded-lg bg-main text-white overflow-scroll">
            <div className="font-bold">Patient Details</div>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Last Date</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, idx) => (
                  <tr key={idx} className="">
                    <td className="py-2">
                      <BsFillPersonFill />
                    </td>
                    <td className="py-2">{patient.name}</td>
                    <td className="py-2">{patient.last.substring(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  );
};

export default Admin;
