import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";

const COLORS = [
  "#FF3366",
  "#FF9933",
  "#FFCC33",
  "#99CC33",
  "#33CC99",
  "#3366FF",
  "#9933FF",
  "#CC33FF",
  "#FF33CC",
  "#FF3333",
  "#3399FF",
  "#33FF99",
];

const monthKeys = [
  { month: "Jan", color: COLORS[0] },
  { month: "Feb", color: COLORS[1] },
  { month: "Mar", color: COLORS[2] },
  { month: "Apr", color: COLORS[3] },
  { month: "May", color: COLORS[4] },
  { month: "Jun", color: COLORS[5] },
  { month: "Jul", color: COLORS[6] },
  { month: "Aug", color: COLORS[7] },
  { month: "Sep", color: COLORS[8] },
  { month: "Oct", color: COLORS[9] },
  { month: "Nov", color: COLORS[10] },
  { month: "Dec", color: COLORS[11] },
];

const Example = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8002/api/patients/getmonthpatients"
        );
        const appointmentsByMonth = response.data.appointmentsByMonth;
        const transformedData = appointmentsByMonth.map((item, index) => ({
          name: `Group ${item._id}`,
          value: item.totalAppointments,
          color: monthKeys[index].color,
        }));
        setData(transformedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const monthName = activeIndex === index ? monthKeys[index].month : ""; // Show month name only when hovering
    const value = data[index].value; // Get the value from the data array

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${value}${monthName ? ` (${monthName})` : ""}`}{" "}
        {/* Display the value and month name */}
      </text>
    );
  };

  const chartTitle =
    data.length > 0 ? "Appointments Numbers Depends On Month" : "Loading...";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h6 className="text-center">{chartTitle}</h6>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={(data, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center items-center">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {monthKeys.map((entry, index) => (
            <div
              key={`key-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 10,
                  backgroundColor: entry.color,
                  marginRight: 5,
                }}
              />
              <h6>{entry.month}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Example;
