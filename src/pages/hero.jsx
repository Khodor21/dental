import React from "react";
import Navbar from "../components/Navbar";
import HeroServices from "../components/heroServices";
import Appointments from "./Appoinments";
import Maps from "./Maps";
import Main from "./Main";
import Footer from "./Footer";
import Carousell from "./Carousel";
import Team from "./Team";

const Hero = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <Main />
      <HeroServices />
      <Appointments />
      <Carousell />
      <Team />
      <Maps />
      <Footer />
    </div>
  );
};

export default Hero;
