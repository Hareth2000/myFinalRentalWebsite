import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const carouselRef = useRef(null);

  const categories = [
    {
      title: "آليات ثقيلة",
      description:
        "معدات ثقيلة للبناء والتشييد مع أعلى معايير الجودة والسلامة.",
      image:
        "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "🚜",
      count: "25+",
      path: "/categories", // المسار الخاص بهذا التصنيف
    },
    {
      title: "عدد صناعية",
      description:
        "أدوات صناعية موثوقة لمختلف الاستخدامات والمشاريع الاحترافية.",
      image:
        "https://images.pexels.com/photos/7484788/pexels-photo-7484788.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "🔧",
      count: "18+",
      path: "/categories", // المسار الخاص بهذا التصنيف
    },
    {
      title: "عدد زراعية",
      description:
        "معدات زراعية حديثة لتحسين الإنتاجية والكفاءة في القطاع الزراعي.",
      image:
        "https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "🌱",
      count: "15+",
      path: "/categories", // المسار الخاص بهذا التصنيف
    },
  ];

  // تأثيرات الحركة للبطاقات
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white"
      dir="rtl"
    >
      {/* خلفيات ديكورية محسنة */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2C2727]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse"></div>

      {/* أشكال زخرفية */}
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-yellow-200 rounded-full"></div>
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-[#2C2727]/20 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* العنوان الرئيسي المحسن */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-100 text-yellow-500 text-sm rounded-full font-semibold tracking-wide shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            تصفح فئاتنا
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-[#2C2727] to-[#2C2727]/80">
              اكتشف
            </span>{" "}
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-400">
                معداتنا
              </span>
              <motion.span
                className="absolute bottom-1 left-0 right-0 h-3 bg-yellow-200 -z-10 rounded-lg"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.span>
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-[#2C2727] to-[#2C2727]/80">
              المتخصصة
            </span>
          </h2>

          <p className="text-[#2C2727]/70 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            نوفر مجموعة واسعة من المعدات الصناعية والزراعية المتخصصة لتلبية جميع
            احتياجات مشاريعك بكفاءة.
          </p>
        </motion.div>

        {/* الشبكة الرئيسية المحسنة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 bg-white"
            >
              {/* الصورة مع تأثير */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2727]/70 via-[#2C2727]/20 to-transparent"></div>

                {/* شارة العدد مع رمز */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-yellow-500 text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                  <span>{category.icon}</span>
                  <span>{category.count}</span>
                </div>

                {/* زر مخفي يظهر عند التحويم */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => navigate(category.path)}
                    className="bg-white shadow-lg rounded-full px-5 py-2 text-sm font-bold text-yellow-500 flex items-center gap-2"
                  >
                    <span>تصفح الآن</span>
                    <ArrowLeft size={16} />
                  </button>
                </motion.div>
              </div>

              {/* محتوى البطاقة */}
              <div className="p-6 group-hover:bg-gradient-to-r from-yellow-50 to-white transition-all duration-300">
                <h3 className="text-xl font-bold text-[#2C2727] mb-2">
                  {category.title}
                </h3>
                <p className="text-[#2C2727]/70 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between"
                >
                  <motion.button
                    onClick={() => navigate(category.path)}
                    className="flex items-center text-yellow-500 hover:text-yellow-600 text-sm font-semibold transition-colors"
                  >
                    <span>تصفح المعدات</span>
                    <ArrowLeft size={16} className="mr-2" />
                  </motion.button>
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                    <Plus size={18} />
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* زر عرض المزيد المحسن */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(250,204,21,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-[#2C2727] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center mx-auto gap-3"
          >
            عرض جميع الفئات
            <ArrowLeft size={20} strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;

