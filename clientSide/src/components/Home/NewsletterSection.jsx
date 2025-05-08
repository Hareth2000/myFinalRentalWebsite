import React from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const NewsletterSection = () => {
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
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-block px-4 py-1 bg-yellow-100 rounded-full text-yellow-500 text-sm font-medium mb-4">
            اشترك في النشرة البريدية
          </div>
          <h2 className="text-4xl font-bold text-[#2C2727] mb-4">
            ابقَ على اطلاع <span className="text-yellow-500">بآخر العروض</span>
          </h2>
          <p className="text-[#2C2727]/80 mb-8 max-w-2xl mx-auto">
            اشترك في نشرتنا البريدية لتكون أول من يعرف عن العروض الخاصة والخصومات الحصرية
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative flex-grow"
            >
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Mail className="text-[#2C2727]/40" size={20} />
              </div>
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full px-4 py-3 pr-10 rounded-xl border border-[#2C2727]/20 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 transition-all duration-300"
              />
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-[#2C2727] text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="font-medium">اشتراك</span>
              <Send size={20} />
            </motion.button>
            </div>

          <p className="text-sm text-[#2C2727]/60 mt-4">
            نحن نحترم خصوصيتك. لن نشارك بريدك الإلكتروني مع أي طرف ثالث.
            </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
