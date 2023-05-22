import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Search from "../components/Search";

const PatientsTable = () => {
  const [patients, setPatients] = useState([]);
  const [editedPatient, setEditedPatient] = useState(null);
  const [deletedPatient, setDeletedPatient] = useState(null);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newService, setNewService] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios
      .get("http://localhost:8002/api/patients/getallpatients")
      .then((response) => {
        setPatients(response.data.patients);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (patient) => {
    setEditedPatient(patient);
    setNewName(patient.name);
    setNewPhone(patient.number);
    setNewService(patient.service);
    setNewCity(patient.city);
    setNewDate(patient.last);
  };

  const handleDelete = (patient) => {
    if (patient && patient._id) {
      axios
        .delete(`http://localhost:8002/api/patients/${patient._id}`)
        .then(() => {
          setPatients(patients.filter((p) => p._id !== patient._id));
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
      name: newName,
      number: newPhone,
      city: newCity,
      last: newDate,
      service: newService,
    };
    axios
      .put(
        `http://localhost:8002/api/patients/${editedPatient._id}`,
        updatedPatient
      )
      .then((response) => {
        fetchPatients(); // Fetch the updated list of patients after saving the edit
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
    setPatients(searchResults);
  };

  return (
    <div className="pt-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <div className="flex justify-between  text-main ">
              <div className="flex gap-2 text-3xl">
                <div className="mt-[2px]">
                  <BsFillPersonFill />
                </div>
                Patients List
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
          <thead className="uppercase text-center  text-main">
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
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Service
              </th>
              <th scope="col" className="px-6 py-3">
                last Appointment
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
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
                      patient.name
                    )}
                  </td>

                  <td className="">
                    {editedPatient && editedPatient._id === patient._id ? (
                      <input
                        type="number"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="border-2 border-fourth p-2 w-full rounded-lg"
                      />
                    ) : (
                      patient.number
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    {editedPatient && editedPatient._id === patient._id ? (
                      <input
                        type="number"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="border-2 border-fourth p-2 w-full rounded-lg"
                      />
                    ) : (
                      patient.city
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    {editedPatient && editedPatient._id === patient._id ? (
                      <input
                        type="number"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        className="border-2 border-fourth p-2 w-full rounded-lg"
                      />
                    ) : (
                      patient.service
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    {editedPatient && editedPatient._id === patient._id ? (
                      <input
                        type="number"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="border-2 border-fourth p-2 w-full rounded-lg"
                      />
                    ) : (
                      patient.last.substring(0, 10)
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

export default PatientsTable;
