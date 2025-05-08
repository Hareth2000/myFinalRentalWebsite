import React from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Truck, CheckCircle, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "ابحث عن المعدة",
      description: "تصفح مجموعتنا الواسعة من المعدات الصناعية",
      color: "from-yellow-500 to-[#2C2727]"
    },
    {
      icon: Calendar,
      title: "حدد المدة",
      description: "اختر فترة الإيجار المناسبة لمشروعك",
      color: "from-[#2C2727] to-yellow-500"
    },
    {
      icon: Truck,
      title: "التوصيل",
      description: "نقوم بتوصيل المعدات إلى موقع المشروع",
      color: "from-yellow-500 to-[#2C2727]"
    },
    {
      icon: CheckCircle,
      title: "استلام المعدة",
      description: "استلم المعدات وابدأ العمل فوراً",
      color: "from-[#2C2727] to-yellow-500"
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-10 w-64 h-64 bg-yellow-100 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#2C2727]/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-yellow-100 rounded-full text-yellow-500 text-sm font-medium mb-4">
            عملية بسيطة وسريعة
          </span>
          <h2 className="text-4xl font-bold text-[#2C2727] mb-4">
            كيف نعمل في <span className="text-yellow-500">4 خطوات بسيطة</span>
          </h2>
          <p className="text-[#2C2727]/80 max-w-2xl mx-auto">
            نهدف إلى جعل عملية استئجار المعدات سهلة وسريعة قدر الإمكان لتوفير وقت وجهد عملائنا الكرام
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-1 bg-gradient-to-r from-[#FF7517] to-[#2C2727] rounded-full"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#2C2727] mb-3">{step.title}</h3>
                <p className="text-[#2C2727]/80 mb-4">{step.description}</p>
                <div className="flex items-center justify-center text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">المزيد</span>
                  <ArrowRight size={16} className="mr-1" />
                </div>
              </div>
              
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
            </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-[#2C2727] text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 mx-auto hover:shadow-lg transition-all duration-300"
          >
            <span className="font-medium">ابدأ الآن</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

