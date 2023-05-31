import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbMessageCircle } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Search from "../components/Search";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [editedMessage, setEditedMessage] = useState(null);
  const [deletedMessage, setDeletedMessage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newService, setNewService] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios
      .get("http://localhost:8002/api/patients/getMessage")
      .then((response) => {
        const reverseData = response.data.reverse();
        setMessages(reverseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (patient) => {
    setEditedMessage(patient);
    setNewName(patient.name);
    setNewPhone(patient.number);
    setNewService(patient.service);
    setNewCity(patient.city);
    setNewDate(patient.last);
  };

  const handleDelete = (message) => {
    if (message && message._id) {
      axios
        .delete(`http://localhost:8002/api/messages/${message._id}`)
        .then(() => {
          setMessages(message((p) => p._id !== message._id));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Invalid message object:", message);
    }
  };

  const deletePatient = (patientDeleted) => {
    setDeletedMessage(patientDeleted);
    handleDelete(patientDeleted);
  };

  const handleSave = () => {
    const updatedPatient = {
      ...editedMessage,
      name: newName,
      number: newPhone,
      city: newCity,
      last: newDate,
      service: newService,
    };
    axios
      .put(
        `http://localhost:8002/api/patients/${editedMessage._id}`,
        updatedPatient
      )
      .then((response) => {
        fetchMessages(); // Fetch the updated list of patients after saving the edit
      })
      .catch((error) => {
        console.log(error);
      });
    setEditedMessage(null);
  };

  const handleCancel = () => {
    setEditedMessage(null);
  };

  const handleSearchResult = (searchResults) => {
    setMessages(searchResults);
  };

  return (
    <div className="pt-10 w-screen px-10 ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <div className="flex justify-between  text-main ">
              <div className="flex gap-2 text-3xl">
                <div className="mt-[2px]">
                  <TbMessageCircle />
                </div>
                Subscriptions History
              </div>
            </div>
            <h6 className="mt-3 text-sm font-normal">
              A patient details list is a confidential record that contains
              important information about each patient. This list is intended
              only for doctors and other healthcare providers who are
              responsible for the patient's care.
            </h6>
            <div className="mt-6">
              <Search handleSearchResult={handleSearchResult} />
            </div>
          </caption>
          <thead className="uppercase text-center bg-main text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Patient name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>

              <th scope="col" className="px-6 py-3">
                Edit/delete
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {messages &&
              messages.map((patient, index) => (
                <tr
                  key={patient.id}
                  className="bg-white border-b text-cn dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}-</td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {editedMessage && editedMessage._id === patient._id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border-2 border-gray-200 p-2 w-full rounded-lg"
                      />
                    ) : (
                      patient.name
                    )}
                  </td>

                  <td className="">
                    {editedMessage && editedMessage._id === patient._id ? (
                      <input
                        type="number"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="border-2 border-fourth p-2 w-full rounded-lg"
                      />
                    ) : (
                      patient.phone
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deletePatient(patient)}
                      className=" text-red text-2xl"
                    >
                      {<AiOutlineDelete />}
                    </button>

                    <button
                      onClick={() => handleEdit(patient)}
                      className=" text-main text-2xl"
                    >
                      <CiEdit />{" "}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleSave} className="pt-10 ">
        <div className="bg-main rounded-lg text-white">
          <h1 className="m-4"> Press To Save Your Edit</h1>
        </div>
      </button>
    </div>
  );
};

export default Message;
