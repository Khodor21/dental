import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDone, MdNotificationsActive } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Search from "../components/Search";
import Modal from "../components/MessageModal"; // Import the Modal component

const PatientsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // New state variable for modal
  const [patients, setPatients] = useState([]);
  const [editedPatient, setEditedPatient] = useState(null);
  const [deletedPatient, setDeletedPatient] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newService, setNewService] = useState("");
  const [newDate, setNewDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([
    "9:00 AM",
    "9:45 AM",
    "10:30 AM",
    "11:15 AM",
    "12:00 PM",
    "12:45 PM",
    "1:30 PM",
    "2:15 PM",
    "3:00 PM",
    "3:45 PM",
    "4:30 PM",
    "5:15 PM",
    "6:00 PM",
    "6:45 PM",
    "7:30 PM",
    "8:15 PM",
    "9:00 PM",
    // Add more time slots as needed
  ]);
  const [time, setTime] = useState("");
  const [selectedTimes, setSelectedTimes] = useState({});
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showFivePatients, setShowFivePatients] = useState(false);

  const toggleModal = (patient) => {
    setSelectedPatient(patient);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPatient(null);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios
      .get("http://localhost:8002/api/patients/getallpatients")
      .then((response) => {
        const reversedPatients = response.data.patients.reverse();
        const slicedPatients = reversedPatients.slice(0, 5);
        setPatients(showFivePatients ? slicedPatients : reversedPatients);
      })
      .catch((error) => {
        console.log(error);
        setPatients([]);
      });
  };

  const handleButtonClick = () => {
    setShowFivePatients(!showFivePatients);
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
      appointmentTime:
        selectedTimes[editedPatient._id] || editedPatient.appointmentTime,
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
    setPatients(searchResults);
  };

  const handleChange = (patientId, selectedTime) => {
    setSelectedTimes((prevSelectedTimes) => {
      const updatedTimes = { ...prevSelectedTimes };
      updatedTimes[patientId] = selectedTime;
      return updatedTimes;
    });
  };

  const handleSubmit = () => {
    if (editedPatient) {
      const patientId = editedPatient._id;
      const updatedPatient = {
        ...editedPatient,
        name: newName,
        number: newPhone,
        city: newCity,
        last: newDate,
        service: newService,
        appointmentTime:
          selectedTimes[patientId] || editedPatient.appointmentTime,
      };

      axios
        .put(`http://localhost:8002/api/patients/${patientId}`, updatedPatient)
        .then((response) => {
          fetchPatients();
          setEditedPatient(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handlePostTime = () => {
    axios
      .post("http://localhost:8002/api/patients/time", { time })
      .then((res) => {
        console.log("Time posted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(selectedPatient);
  return (
    <div className="py-10 w-screen px-2 bg-[#f0f0f0]">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <button onClick={handleButtonClick}>
          {showFivePatients ? "Show All Patients" : "Show Five Patients"}
        </button>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <div className="flex justify-between text-main">
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
          <thead className="uppercase text-center bg-main text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Patient Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Appointment Date
              </th>
              <th scope="col" className="px-6 py-3">
                Appointment Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Settings{" "}
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {patients && patients.length > 0 ? (
              patients.map((patient, index) => (
                <tr
                  key={patient._id}
                  className="bg-white border-b text-cn dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}-</td>
                  <td
                    scope="row"
                    className="px-6 py-4 cursor-pointer text-main font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {editedPatient && editedPatient._id === patient._id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border-2 border-gray-200 p-2 w-full rounded-lg"
                      />
                    ) : (
                      <div onClick={() => toggleModal(patient)}>
                        {patient.name}
                      </div>
                    )}
                  </td>
                  <td>
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
                  <td className="px-6 py-4 text-main">
                    {editedPatient && editedPatient._id === patient._id ? (
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="border-2 border-fourth p-2 w-full rounded-lg"
                      />
                    ) : (
                      patient.city
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
                      patient.last.substring(0, 10)
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editedPatient && editedPatient._id === patient._id ? (
                      <select
                        className="border-2 text-center border-fourth p-2 rounded-lg"
                        value={selectedTimes[patient._id] || ""}
                        onChange={(e) =>
                          handleChange(patient._id, e.target.value)
                        }
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map((slot) => (
                          <option
                            key={slot}
                            value={slot}
                            className="text-right"
                          >
                            {slot}
                          </option>
                        ))}
                      </select>
                    ) : (
                      patient.appointmentTime
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editedPatient && editedPatient._id === patient._id ? (
                      <select
                        className="border-2 text-center border-fourth p-2 rounded-lg"
                        value={selectedTimes[patient._id] || ""}
                        onChange={(e) =>
                          handleChange(patient._id, e.target.value)
                        }
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map((slot) => (
                          <option
                            key={slot}
                            value={slot}
                            className="text-right"
                          >
                            {slot}
                          </option>
                        ))}
                      </select>
                    ) : editedPatient && editedPatient._id === patient._id ? (
                      editedPatient.appointmentTime ? (
                        <div className="text-[#28c228]"> Success</div>
                      ) : (
                        <div className="text-[#ca7729]">Waiting...</div>
                      )
                    ) : patient.appointmentTime ? (
                      <div className="text-[#28c228]"> Success...</div>
                    ) : (
                      <div className="text-[#ca7729]">Waiting...</div>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center flex">
                    <button
                      className="text-main text-2xl relative"
                      onClick={() => toggleModal(patient)}
                    >
                      <MdNotificationsActive />
                      {patient.message && (
                        <span className="absolute top-3 right-4 w-3 h-3 rounded-full bg-red text-xs flex items-center justify-center text-white"></span>
                      )}
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-main text-2xl font-extrabold"
                    >
                      <MdDone />
                    </button>{" "}
                    <button
                      onClick={() => deletePatient(patient)}
                      className="text-red text-2xl"
                    >
                      <AiOutlineDelete />
                    </button>
                    <button
                      onClick={() => handleEdit(patient)}
                      className="text-main text-2xl"
                    >
                      <CiEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No patients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedPatient && (
        <Modal
          toggleModal={closeModal}
          name={selectedPatient.name}
          message={selectedPatient.message}
          time={selectedPatient.timeSlot}
        />
      )}
    </div>
  );
};

export default PatientsTable;
