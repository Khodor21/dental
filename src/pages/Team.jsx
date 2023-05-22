import React from "react";
import TeamCard from "../components/TeamCard";
import Doctor1 from "../assets/Adeeb.png";
import Doctor2 from "../assets/abrar.png";
import Doctor3 from "../assets/abeer.png";
import Doctor4 from "../assets/ahmad.png";
import { motion, AnimatePresence } from "framer-motion";

const Team = () => {
  return (
    <div id="Team">
      <h3 className="text-[40px] text-main text-center p-8">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 2, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 2.0 }}
          >
            فريقنا المميّز
          </motion.div>
        </AnimatePresence>
      </h3>{" "}
      <div className="grid md:grid-cols-2 grid-cols-1">
        <TeamCard
          Name="Dr. Adeeb Qarmout"
          Age="+25 Years of experience"
          Desc="Specialist in Implantology
"
          Image={Doctor1}
        />
        <TeamCard
          Name="Dr. Abrar Saleh"
          Age="+4 years of experience"
          Desc="General Dentist"
          Image={Doctor2}
        />
        <TeamCard
          Name="Dr. Amina Abdulhameed"
          Age="+2 Years of experience"
          Desc="Aesthetic Dentist"
          Image={Doctor3}
        />
        <TeamCard
          Name="Dr. Ahmed El-Haj"
          Age="+27 Years of experience"
          Desc="Aesthetic Dentistry"
          Image={Doctor4}
        />
      </div>
    </div>
  );
};

export default Team;
