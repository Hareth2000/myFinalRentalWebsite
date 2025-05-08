import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-[#F6F4F4]">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/src/assets/videos/hero-poster.jpg"
        >
          <source src="/src/assets/Hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#2C2727]/70"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center md:items-start text-center md:text-right">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            حلول متكاملة
            <span className="text-yellow-500"> لتأجير المعدات&nbsp;</span>
            الصناعية
          </h1>
          <p className="text-lg sm:text-xl text-[#F6F4F4]/90 mb-8 leading-relaxed">
            نوفر لك أحدث المعدات الصناعية مع خدمة مميزة ودعم فني متواصل
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
            >
              <span className="font-medium">ابدأ الآن</span>
              <ArrowLeft size={20} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute bottom-8 left-0 right-0"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "معدة متوفرة", value: 150 },
                { label: "عميل راضٍ", value: 500 },
                { label: "خدمة", value: 10 },
                { label: "دعم فني متواصل", value: 24 },
              ].map((stat, index) => {
                const [count, setCount] = useState(0);

                useEffect(() => {
                  let start = 0;
                  const end = stat.value;
                  if (start === end) return;

                  const incrementTime = Math.abs(Math.floor(2000 / end));
                  const timer = setInterval(() => {
                    start += 1;
                    setCount(start);
                    if (start === end) clearInterval(timer);
                  }, incrementTime);

                  return () => clearInterval(timer);
                }, [stat.value]);

                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#2C2727]/20 backdrop-blur-sm rounded-lg p-4 text-center"
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {count}+
                    </h3>
                    <p className="text-sm sm:text-base text-[#F6F4F4]/90">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

