import React from "react";

const Bottom = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-main py-4">
      <ul className="flex justify-around">
        <li>
          <a
            href="#"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Bottom;
