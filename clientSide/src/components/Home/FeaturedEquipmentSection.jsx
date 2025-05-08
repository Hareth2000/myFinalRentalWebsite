import React from "react";
import { motion } from "framer-motion";
import { Star, Clock, MapPin, Calendar, ArrowRight } from "lucide-react";

const FeaturedEquipmentSection = () => {
  const featuredEquipment = [
    {
      id: 1,
      title: "حفارة هيدروليكية",
      category: "معدات بناء",
      image: "https://images.pexels.com/photos/30751525/pexels-photo-30751525/free-photo-of-yellow-excavator-at-urban-construction-site.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "2,500 دينار/يوم",
      rating: 4.8,
      reviews: 120,
      location: "عمان",
      availability: "متاح الآن",
      features: ["قوة 250 حصان", "سعة 1.5 م³", "عمق حفر 6 م"]
    },
    {
      id: 2,
      title: "رافعة برجية",
      category: "معدات بناء",
      image: "https://images.pexels.com/photos/93400/pexels-photo-93400.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "3,500 دينار/يوم",
      rating: 4.9,
      reviews: 95,
      location: "إربد",
      availability: "متاح الآن",
      features: ["ارتفاع 50 م", "حمولة 5 طن", "نظام تحكم عن بعد"]
    },
    {
      id: 3,
      title: "شاحنة قلابة",
      category: "معدات نقل",
      image: "https://images.pexels.com/photos/188679/pexels-photo-188679.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "1,800 دينار/يوم",
      rating: 4.7,
      reviews: 150,
      location: "الزرقاء",
      availability: "متاح الآن",
      features: ["سعة 15 م³", "محرك ديزل", "نظام تعليق هوائي"]
    }
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-yellow-100 rounded-full text-yellow-500 text-sm font-medium mb-4">
            المعدات المميزة
          </span>
          <h2 className="text-4xl font-bold text-[#2C2727] mb-4">
            اكتشف <span className="text-yellow-500">أفضل المعدات</span>
          </h2>
          <p className="text-[#2C2727]/80 max-w-2xl mx-auto">
            استعرض مجموعة مختارة من أفضل المعدات المتاحة للإيجار في الأردن
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEquipment.map((equipment, index) => (
            <motion.div
              key={equipment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={equipment.image}
                    alt={equipment.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2727]/70 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                      {equipment.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#2C2727]">{equipment.title}</h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span className="mr-1 font-medium">{equipment.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    {equipment.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-[#2C2727]/70">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#2C2727]/70 mb-5">
                    <div className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      <span>{equipment.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      <span>{equipment.availability}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-yellow-500">{equipment.price}</span>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-[#2C2727] text-white text-sm rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      احجز الآن
                    </motion.button>
                  </div>
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
            className="bg-gradient-to-r from-yellow-500 to-[#2C2727] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <span className="font-medium">عرض جميع المعدات</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEquipmentSection;

