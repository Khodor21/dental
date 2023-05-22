import React from "react";
import Implants from "../assets/implants.png";
import Orthodontics from "../assets/Orthodontics.png";
import Crown from "../assets/Crown.png";
import Smile from "../assets/Smile.png";
import Surgery from "../assets/Surgery.png";
import Teeth from "../assets/teeth.png";
import Whitening from "../assets/Whitening.png";
import Periodontal from "../assets/Periodontal.png";
import { motion, AnimatePresence } from "framer-motion";

const HeroServices = () => {
  const services = [
    {
      arabic: "زراعة الأسنان والتطعيم العظمي",
      english: "Dental Implants & Bone Grafting",
      img: Implants,
    },
    {
      arabic: " تقويم الأسنان والفكين",
      english: "Orthodontics",
      img: Orthodontics,
    },
    {
      arabic: "تركيبات الأسنان",
      english: "Crown & Bridge",
      img: Crown,
    },
    {
      arabic: "تجميل الأسنان وتصميم الابتسامة",
      english: "Easthetic dentisty & smile design",
      img: Smile,
    },
    {
      arabic: "جراحات الفم والأسنان ",
      english: "Dental surgery",
      img: Surgery,
    },
    {
      arabic: "طب أسنان الأطفال والتقويم الوقائي",
      english: "Pedodontics",
      img: Teeth,
    },
    {
      arabic: "علاج اللثة ورائحة الفم",
      english: "Periodontal Treatments",
      img: Periodontal,
    },
    {
      arabic: "تبييض الأسنان",
      english: "Teeth Whitening",
      img: Whitening,
    },
  ];
  return (
    <div className="">
      <h3 className="text-[40px] text-main text-center p-8">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 2, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 2.0 }}
          >
            متخصصون في
          </motion.div>
        </AnimatePresence>
      </h3>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 1 }}
        >
          {" "}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-8 lg:px-20 px-10 text-center">
            {services.map((map, idx) => (
              <div
                key={idx}
                className="border-fourth bg-main rounded-lg flex flex-col justify-center items-center "
              >
                <img src={map.img} className="w-[40px] md:mt-4 mt-6" />
                <div>
                  <h2 className="text-white text-center mt-10">{map.arabic}</h2>
                  <h5 className="text-white text-center mb-2 mt-2">
                    {map.english}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroServices;
