import React, { useState, useEffect } from "react";
import axios from "axios";

const MessageHome = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = () => {
    axios
      .get("http://localhost:8002/api/patients/getMessage")
      .then((response) => {
        const reverseData = response.data.slice(-5).reverse();
        setMessage(reverseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 rounded-lg bg-[#fff] text-main">
        <h5 className="text-[#000] font-bold">Last 5 Subscribers</h5>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-[#000]">
              <th>#</th>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {message.map((messages, index) => (
              <tr key={index} className="text-main border-b border-[#000]">
                <td>{index + 1}-</td>
                <td className="py-2 text-sm">{messages.name}</td>
                <td className="py-4">{messages.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageHome;
