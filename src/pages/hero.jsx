import React from "react";
import Navbar from "../components/Navbar";
import HeroServices from "../components/heroServices";
import Appointments from "./Appoinments";
import Maps from "./Maps";
import Main from "./Main";
import Footer from "./Footer";
import Carousell from "./Carousel";
import Team from "./Team";
import Companies from "./Companies";
import BefAft from "./BefAft";

const Hero = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <Main />
      <HeroServices />
      <Appointments />
      <Carousell />
      <Team />
      <BefAft />
      <Companies />
      <Maps />
      <Footer />
    </div>
  );
};

export default Hero;
