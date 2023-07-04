import React from "react";
import Chair from "../assets/chair.png";
import { motion, AnimatePresence } from "framer-motion";
import { BiMessageRoundedDots } from "react-icons/bi";

const Chat = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-10 ">
      <div className="lg:w-1/2 py-10 md:px-8 text-right">
        <div className="bg-main w-fit rounded-xl">
          <h3 className="text-[18px] md:text-[22px] text-white text-center p-4 lg:hidden">
            احصل على محادثة مباشرة مع أطبائنا
          </h3>
        </div>
        <img src={Chair} className="" />
      </div>
      <div className="lg:w-1/2 mb-10 lg:mb-0 flex flex-col items-center justify-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 2, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 2.0 }}
          >
            {" "}
            <div className="bg-main w-fit rounded-xl hidden lg:block">
              <h3 className="text-[18px] md:text-[22px] text-white text-center p-4">
                احصل على محادثة مباشرة مع أطبائنا
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 2, x: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 2.0 }}
          >
            <p className="xs:text-center sm:text-center xs:mx-2 sm:mx-2 text-xl mt-6">
              ابدأ محادثة حرة ومباشرة مع الأطباء المؤهلين للحصول على المشورة
              الطبية والأجوبة على أسئلتك دون أي تكلفة. اطرح استفساراتك واحصل على
              إرشادات صحية في الوقت الحقيقي وتواصل مع الخبراء للحفاظ على صحتك
              وراحتك النفسية
            </p>
          </motion.div>
          <div className="mt-6 bg-main w-[65%] rounded  flex justify-center">
            <button className="text-white m-2 flex gap-2">
              ابدأ المحادثة اللآن
              <BiMessageRoundedDots className="mt-1 font-bold text-xl" />
            </button>
          </div>{" "}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chat;
