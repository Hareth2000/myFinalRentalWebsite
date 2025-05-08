import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      role: "مدير مشروع",
      company: "شركة البناء الحديث",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      rating: 5,
      content: "خدمة ممتازة ومعدات عالية الجودة. فريق العمل محترف جداً ويقدم الدعم الفني المطلوب. أنصح الجميع بالتعامل معهم."
    },
    {
      id: 2,
      name: "سارة عبدالله",
      role: "مهندسة مدنية",
      company: "مكتب الهندسة المتقدم",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      rating: 5,
      content: "تعاملت معهم في عدة مشاريع وكانت تجربة رائعة. المعدات بحالة ممتازة والخدمة سريعة وفعالة."
    },
    {
      id: 3,
      name: "خالد سعيد",
      role: "مقاول",
      company: "مؤسسة البناء المتكامل",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      rating: 4,
      content: "أسعار تنافسية وخدمة عملاء مميزة. المعدات دائماً متوفرة وجاهزة للاستخدام."
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
            آراء عملائنا
          </span>
          <h2 className="text-4xl font-bold text-[#2C2727] mb-4">
            ماذا يقول <span className="text-yellow-500">عملاؤنا</span>
          </h2>
          <p className="text-[#2C2727]/80 max-w-2xl mx-auto">
            نفتخر برضا عملائنا ونعمل باستمرار على تحسين خدماتنا
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-100"
                    />
                    <div className="mr-4">
                      <h4 className="font-bold text-[#2C2727]">{testimonial.name}</h4>
                      <p className="text-sm text-[#2C2727]/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="mr-1 font-medium">{testimonial.rating}</span>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -right-2 text-yellow-100 w-8 h-8" />
                  <p className="text-[#2C2727]/80 leading-relaxed">{testimonial.content}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-[#2C2727]/10">
                  <p className="text-sm text-[#2C2727]/60">{testimonial.company}</p>
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
            <span className="font-medium">المزيد من الآراء</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
