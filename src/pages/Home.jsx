import React, { useEffect, useState } from "react";
import axios from "axios";
import Message from "./Message";
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
import DoughnutChart from "../components/patientBar";
import PatientsHome from "../components/patientHome";

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
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
      labels: monthNumber.map((patient) => monthNames[patient._id - 1]),
      datasets: [
        {
          label: "Incomes",
          data: monthNumber.map((patient) => patient.totalAppointments),
          borderColor: "#5E3B97",
          backgroundColor: "#5E3B97",
          text: "Poppins",
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
          font: "Poppins",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [monthNumber]); // Add monthNumber as a dependency

  console.log(monthNumber);

  return (
    <>
      <div className="w-full pt-10 flex flex-col bg-[#f3f2f2]">
        <h5 className="text-center text-main text-2xl pb-4">
          Healthcare Dashboard: Patient Appointments, Subscriptions, and Profit
          Analysis.
        </h5>
        <h6 className="mx-10 text-center">
          Track patient appointments, subscriptions, and profitability with this
          comprehensive healthcare dashboard. Stay organized with an intuitive
          table view, manage patient subscriptions, and analyze profit trends.
          Gain valuable insights and make informed decisions for efficient
          healthcare operations.{" "}
        </h6>
        <div className="p-4 grid grid-cols-3  gap-4">
          <div className="w-full col-span-2 relative h-full  m-auto p-4  rounded-lg bg-white">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <PatientsHome />
        </div>
        <div className="p-4 grid grid-cols-3  gap-4">
          <div className="w-full col-span-2 relative h-full  m-auto p-4  rounded-lg bg-white">
            <DoughnutChart />
          </div>
          <Message />
        </div>
      </div>
    </>
  );
};

export default Admin;
