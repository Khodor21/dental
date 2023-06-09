import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiReceiveMoney } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Search from "../components/Search";

const PatientsTable = () => {
  const [patients, setPayments] = useState([]);
  const [editedPatient, setEditedPatient] = useState(null);
  const [deletedPatient, setDeletedPatient] = useState(null);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newService, setNewService] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios
      .get("http://localhost:8002/api/patients/getPayments")
      .then((response) => {
        const reversePaymentList = response.data.reverse();
        setPayments(reversePaymentList);
        console.log(reversePaymentList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (patient) => {
    setEditedPatient(patient);
    setNewName(patient.name);
    setNewPhone(patient.number);
    setNewPrice(patient.price);
    setNewService(patient.service);
    setNewDate(patient.date);
  };

  const handleDelete = (patient) => {
    if (patient && patient._id) {
      axios
        .delete(`http://localhost:8002/api/patients/${patient._id}`)
        .then(() => {
          setPayments(patients.filter((p) => p._id !== patient._id));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Invalid patient object:", patient);
    }
  };

  const deletePatient = (patientDeleted) => {
    setDeletedPatient(patientDeleted);
    handleDelete(patientDeleted);
  };

  const handleSave = () => {
    const updatedPatient = {
      ...editedPatient,
      paymentName: newName,
      price: newPrice,
      number: newPhone,
      date: newDate,
      service: newService,
    };

    axios
      .put(
        `http://localhost:8002/api/patients/${editedPatient._id}`,
        updatedPatient
      )
      .then((response) => {
        fetchPatients();
      })
      .catch((error) => {
        console.log(error);
      });

    setEditedPatient(null);
  };

  const handleCancel = () => {
    setEditedPatient(null);
  };

  const handleSearchResult = (searchResults) => {
    setPayments(searchResults);
  };

  return (
    <div className="pt-10 w-screen px-10 bg-[#f0f0f0]">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <div className="flex justify-between text-main">
              <div className="flex gap-2 text-3xl">
                <div className="mt-[2px]">
                  <GiReceiveMoney />
                </div>
                Payment History
              </div>
            </div>
            <h6
              className="mt-3 text-sm

 font-normal"
            >
              Stay organized with a comprehensive overview of all financial
              transactions, allowing you to track payments made by patients,
              view outstanding balances, and manage revenue effortlessly.
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
                Service
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {patients &&
              patients.map((patient, index) => (
                <tr
                  key={patient.id}
                  className="bg-white border-b text-cn dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}-</td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {editedPatient && editedPatient._id === patient._id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border-2 border-gray-200 p-2 w-full rounded-lg"
                      />
                    ) : (
                      <div className="text-main">{patient.paymentName}</div>
                    )}
                  </td>

                  <td className="">
                    {editedPatient && editedPatient._id === patient._id ? (
                      <input
                        type="text"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        className="border-2 border-fourth p-2 w-full rounded-lg"
                      />
                    ) : (
                      patient.service
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editedPatient && editedPatient._id === patient._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="border-2 border-fourth p-2 w-full rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-[0.25rem]">
                        <h5 className="text-main">{patient.price}</h5>
                        <h6 className="">BHD</h6>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {editedPatient && editedPatient._id === patient._id ? (
                      <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="border-2 border-fourth p-2 w-full rounded-lg"
                      />
                    ) : (
                      patient.date.substring(-5, 10)
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {editedPatient && editedPatient._id === patient._id ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={handleSave}
                          className="text-xs bg-main hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-xs bg-red-600 hover:bg-red-700 text-[#000] font-semibold py-2 px-4 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(patient)}
                          className="text-main text-2xl"
                        >
                          <CiEdit />
                        </button>
                        <button
                          onClick={() => deletePatient(patient)}
                          className="text-red text-2xl"
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsTable;
