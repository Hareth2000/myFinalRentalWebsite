import React from "react";
import { motion } from "framer-motion";
import { Wrench, Truck, Clock, Shield, Users, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Wrench,
      title: "صيانة دورية",
      description: "نقدم خدمات صيانة دورية لجميع المعدات لضمان عملها بكفاءة عالية"
    },
    {
      icon: Truck,
      title: "توصيل المعدات",
      description: "خدمة توصيل المعدات إلى موقع المشروع في الوقت المحدد"
    },
    {
      icon: Wrench,
      title: "دعم فني",
      description: "فريق دعم فني متخصص متاح على مدار الساعة لمساعدتك"
    },
    {
      icon: Clock,
      title: "تأجير مرن",
      description: "خطط تأجير مرنة تناسب احتياجات مشروعك وجدولك الزمني"
    },
    {
      icon: Shield,
      title: "ضمان الجودة",
      description: "جميع المعدات خاضعة لفحوصات دورية للتأكد من جودتها"
    },
    {
      icon: Users,
      title: "استشارات متخصصة",
      description: "فريق من الخبراء لتقديم الاستشارات الفنية والمهنية"
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
            خدماتنا
          </span>
          <h2 className="text-4xl font-bold text-[#2C2727] mb-4">
            نقدم <span className="text-yellow-500">أفضل الخدمات</span>
          </h2>
          <p className="text-[#2C2727]/80 max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات لدعم مشروعك وضمان نجاحه
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-[#2C2727] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#2C2727] mb-3">{service.title}</h3>
                <p className="text-[#2C2727]/80 mb-4">{service.description}</p>
                <div className="flex items-center text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">المزيد</span>
                  <ArrowRight size={16} className="mr-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-[#2C2727] text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <span className="font-medium">تعرف على المزيد</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
