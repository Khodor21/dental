import React from "react";
import HeroBg from "../assets/heroBg.jpg";
import { motion, AnimatePresence } from "framer-motion";

const Main = () => {
  return (
    <div id="home">
      <div className="grid md:grid-cols-2 gap-8 grid-rows p-10 items-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 2.0 }}
          >
            <div className="flex justify-center">
              <img className="rounded-2xl" src={HeroBg} />
            </div>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 2.0 }}
          >
            <div className="text-right ">
              <h2 className="lg:text-5xl md:text-4xl text-3xl mb-8">
                <span className="text-main">ابتسامتك</span> تعكس صحتك{" "}
                <span className="text-main">وجمالك،</span> دلل{" "}
                <span className="text-main">أسنانك</span> بالعناية اللازمة
                وابتسم <span className="text-main">بثقة</span>
              </h2>
              <p className="text-third mr-2">
                عيادة أسنان متخصصة توفر أفضل خدمات العناية بالأسنان للعائلة
                بأكملها. نحن نوفر علاجات طبية متطورة باستخدام أحدث التقنيات
                والمعدات الحديثة لضمان الحصول على أفضل النتائج. زورونا اليوم
                واحصلوا على ابتسامة صحية وجميلة
              </p>
              <div className="flex flex-row-2 justify-center items-center gap-8 mt-5 ">
                <a
                  href="#footer"
                  className=" text-main w-fit rounded-xl hover:text-white hover:bg-main"
                >
                  <h2 className="m-2">تواصل معنا</h2>
                </a>
                <a
                  href="#booking"
                  className="bg-main w-fit rounded-lg text-white"
                >
                  <h2 className="m-2"> احجز موعد الآن</h2>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Main;
