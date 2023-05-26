import React from "react";
import TeamCard from "../components/TeamCard";
import Doctor1 from "../assets/doc1.jpg";
import Doctor2 from "../assets/abrar.jpg";
import Doctor3 from "../assets/abeer.jpg";
import Doctor4 from "../assets/ahmad.jpg";
import Doctor5 from "../assets/duaa.jpg";

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
        <TeamCard Image={Doctor1} />
        <TeamCard Image={Doctor2} />
        <TeamCard Image={Doctor3} />
        <TeamCard Image={Doctor4} />
        <TeamCard Image={Doctor5} />
      </div>
    </div>
  );
};

export default Team;
