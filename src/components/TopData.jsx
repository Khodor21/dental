import React, { useEffect, useState } from "react";
import axios from "axios";

const TopData = () => {
  const [revenueComparison, setRevenueComparison] = useState("");
  const [incomeComparison, setIncomeComparison] = useState("");
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [currentMonthPatients, setCurrentMonthPatients] = useState(0);
  const [previousMonthPatientsCount, setPreviousMonthPatientsCount] =
    useState(0);
  const [recentMonthIncome, setRecentMonthIncome] = useState(0);
  const [previousMonthIncome, setPreviousMonthIncome] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentMonthIndex = new Date().getMonth() + 1;
        const previousMonthIndex =
          currentMonthIndex !== 1 ? currentMonthIndex - 1 : 12;

        // Fetch patients data for the current month
        const currentMonthPatientsResponse = await axios.get(
          `http://localhost:8002/api/patients/getmonthpatients?month=${currentMonthIndex}`
        );
        const currentMonthPatients =
          currentMonthPatientsResponse.data.appointmentsByMonth;
        setCurrentMonthPatients(
          currentMonthPatients.find((month) => month._id === currentMonthIndex)
            ?.totalAppointments || 0
        );

        // Fetch patients data for the previous month
        const previousMonthPatientsResponse = await axios.get(
          `http://localhost:8002/api/patients/getmonthpatients?month=${previousMonthIndex}`
        );
        const previousMonthPatients =
          previousMonthPatientsResponse.data.appointmentsByMonth;
        setPreviousMonthPatientsCount(
          previousMonthPatients.find(
            (month) => month._id === previousMonthIndex
          )?.totalAppointments || 0
        );

        // Fetch current month incomes data
        const currentMonthIncomesResponse = await axios.get(
          "http://localhost:8002/api/patients/income"
        );
        const currentMonthIncomes = currentMonthIncomesResponse.data;

        const currentMonthIncomeData = currentMonthIncomes.find(
          (month) => month._id === currentMonthIndex
        );
        const currentMonthIncome = currentMonthIncomeData
          ? currentMonthIncomeData.totalIncome
          : 0;
        setRecentMonthIncome(currentMonthIncome);

        // Fetch previous month incomes data
        const previousMonthIncomesResponse = await axios.get(
          `http://localhost:8002/api/patients/income?month=${previousMonthIndex}`
        );
        const previousMonthIncomes = previousMonthIncomesResponse.data;
        const previousMonthIncomeData = previousMonthIncomes.find(
          (month) => month._id === previousMonthIndex
        );
        const previousMonthIncome = previousMonthIncomeData
          ? previousMonthIncomeData.totalIncome
          : 0;
        setPreviousMonthIncome(previousMonthIncome);

        // Calculate percentage change
        const revenuePercentage = getPercentageChange(
          currentMonthPatients?.totalAppointments || 0,
          previousMonthPatientsCount
        );
        setRevenueComparison(revenuePercentage);

        // Calculate percentage change
        const incomePercentageChange = getPercentageChange(
          currentMonthIncome,
          previousMonthIncome
        );
        setIncomeComparison(incomePercentageChange);

        // Fetch current month subscribers data
        const subscribersResponse = await axios.get(
          "http://localhost:8002/api/patients/getMessage"
        );
        const subscribersData = subscribersResponse.data;
        const subscribersCount = subscribersData.length;

        setSubscribersCount(subscribersCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getMonthName = (monthIndex) => {
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

    return monthNames[monthIndex];
  };

  const getPercentageChange = (currentValue, previousValue) => {
    if (previousValue === 0) {
      if (currentValue === 0) {
        return "0.00";
      } else {
        return "100.00";
      }
    }

    const change = currentValue - previousValue;
    const percentage = ((change / previousValue) * 100).toFixed(2);
    return percentage;
  };

  const getBackgroundColor = (percentage) => {
    return percentage > 0 ? "#C6F6D5" : "#FED7D7";
  };

  const renderRevenue = () => {
    if (revenueComparison !== "") {
      const revenueMonth = getMonthName(new Date().getMonth());
      const revenueColor = getBackgroundColor(revenueComparison);

      const patientsComparison = getPercentageChange(
        currentMonthPatients,
        previousMonthPatientsCount
      );

      const patientsColor = getBackgroundColor(patientsComparison);

      return (
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <h5 className="text-2xl font-bold text-main">
              {currentMonthPatients}
            </h5>
            <h6 className="text-gray-600">Appointments in {revenueMonth}</h6>
          </div>
          <div
            className="bg-green-200 flex justify-center items-center p-2 rounded-lg"
            style={{ backgroundColor: revenueColor }}
          >
            <h6 className="text-white text-lg">
              {patientsComparison}% ({revenueMonth})
            </h6>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderIncomes = () => {
    if (incomeComparison !== "") {
      const incomesMonth = getMonthName(new Date().getMonth());
      const incomesColor = getBackgroundColor(incomeComparison);

      return (
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full  px-4 py-2 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <h5 className="text-2xl font-bold text-main">
              {recentMonthIncome} D.B
            </h5>
            <h6 className="text-gray-600">Incomes in {incomesMonth}</h6>
          </div>
          <div
            className="bg-green-200 flex justify-center items-center p-2 rounded-lg"
            style={{ backgroundColor: incomesColor }}
          >
            <h6 className="text-white text-lg">
              {incomeComparison}% ({incomesMonth})
            </h6>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderSubscribers = () => {
    const subscribersPercentage = getPercentageChange(
      subscribersCount,
      subscribersCount - 1
    );
    const subscribersColor = getBackgroundColor(subscribersPercentage);

    return (
      <div className="bg-white flex justify-between w-full  px-4 py-2 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <h5 className="text-2xl font-bold text-main">{subscribersCount}</h5>
          <h6 className="text-gray-600">Total Subscribers</h6>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="grid lg:grid-cols-5 gap-4 px-4 py-2">
        {renderRevenue()}
        {renderIncomes()}
        {renderSubscribers()}
      </div>
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4"></div>
    </div>
  );
};

export default TopData;
