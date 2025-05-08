import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "اتصل بنا",
      details: ["07970707243", "0798080243"],
      color: "from-yellow-500 to-[#2C2727]"
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: ["info@m3adaty.com", "support@m3adaty.com"],
      color: "from-[#2C2727] to-yellow-500"
    },
    {
      icon: MapPin,
      title: "العنوان",
      details: ["عمان، الأردن", "شارع المدينة المنورة، مبنى 123"],
      color: "from-yellow-500 to-[#2C2727]"
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: ["الأحد - الخميس: 8:00 ص - 5:00 م", "الجمعة - السبت: مغلق"],
      color: "from-[#2C2727] to-yellow-500"
    }
  ];

  return (
    <section className="relative overflow-hidden py-16">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2C2727]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-yellow-100 rounded-full text-yellow-500 text-sm font-medium mb-4">
            تواصل معنا
          </span>
          <h2 className="text-4xl font-bold text-[#2C2727] mb-4">
            نحن هنا <span className="text-yellow-500">لخدمتك</span>
          </h2>
          <p className="text-[#2C2727]/80 max-w-2xl mx-auto">
            تواصل مع فريقنا للحصول على أفضل الحلول والاستشارات المتخصصة
          </p>
        </motion.div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#2C2727]/5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#2C2727] mb-3">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-[#2C2727]/70 mb-1">{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
  
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#2C2727]/5"
          >
            <h3 className="text-2xl font-bold text-[#2C2727] mb-6">أرسل لنا رسالة</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#2C2727] mb-2">الاسم</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-[#2C2727]/20 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <label className="block text-[#2C2727] mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-[#2C2727]/20 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#2C2727] mb-2">الموضوع</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-[#2C2727]/20 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                  placeholder="أدخل موضوع الرسالة"
                />
              </div>
              <div>
                <label className="block text-[#2C2727] mb-2">الرسالة</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-[#2C2727]/20 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 h-32"
                  placeholder="أدخل رسالتك"
                ></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-yellow-500 to-[#2C2727] text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="font-medium">إرسال الرسالة</span>
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

