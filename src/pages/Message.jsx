import React, { useEffect, useState } from "react";
import axios from "axios";

const Message = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8002/api/patients/getMessage"
        );
        const getNumbers = response.data;
        const getFiveNumbers = getNumbers.slice(-5).reverse();
        setData(getFiveNumbers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto bg-[#f3f2f2]">
      <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 rounded-lg text-main">
        <div className="font-bold">
          {" "}
          <td className="text-[#000]">Last 5 Subscriptions </td>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-[#000]">
              <th>Nb.</th>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className=" text-main">
                <td className="py-4">{index + 1}-</td>
                <td className="py-4">{item.name}</td>
                <td className="py-4">{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Message;
