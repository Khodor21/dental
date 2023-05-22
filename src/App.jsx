import React from "react";
import PatientsTable from "./pages/PatientsTable";
import SideBar from "./pages/SideBar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payments from "./pages/Payments";

import Calendar from "./pages/Calendar";
import Hero from "./pages/hero";
import Carousell from "./pages/Carousel";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Message from "./pages/Message";

const App = () => {
  const showSideBar = window.location.pathname !== "/";

  return (
    <Router>
      <div className="flex gap-8">
        {showSideBar && <SideBar />}

        <Routes>
          <Route path="carousel" element={<Carousell />} />
          <Route path="patients" element={<PatientsTable />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="payments" element={<Payments />} />
          <Route path="/" element={<Hero />} />
          <Route path="home" element={<Home />} />
          <Route path="admin-page" element={<Admin />} />
          <Route path="message" element={<Message />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
