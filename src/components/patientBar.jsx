import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axios from "axios";
import chroma from "chroma-js";

const DoughnutChart = () => {
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8002/api/patients/getmonthpatients"
        );
        setData(response.data.appointmentsByMonth);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Transform the fetched data into the required format
  const transformedData = data.map((item) => ({
    month: item._id,
    patients: item.totalAppointments,
  }));

  // Generate an array of 12 colors close to #5E3B97
  const colors = chroma.scale(["#5E3B97", "#ffffff"]).colors(12);

  return (
    <PieChart width={700} height={700}>
      <Pie
        data={transformedData}
        dataKey="patients"
        outerRadius={250}
        innerRadius={150}
        fill="green"
      >
        {transformedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default DoughnutChart;
