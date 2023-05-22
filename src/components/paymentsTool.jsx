import React from "react";

const PaymentsTool = ({ name, price, last, index }) => {
  return (
    <div className="pt-3">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-[1000px] text-sm">
          <tbody className="text-center">
            <tr className="border-b">
              <td className="px-6 py-4">{index + 1}-</td>
              <td className="px-6 py-4 text-main">{name}</td>
              <td className="px-6 py-4">{price}</td>
              <td className="px-6 py-4 text-main">{last.substring(0, 10)}</td>

              <td className="px-6 py-4 ">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTool;
