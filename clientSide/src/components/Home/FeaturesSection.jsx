import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Shield, 
  Clock, 
  Star, 
  Users, 
  CheckCircle 
} from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'توصيل سريع',
    description: 'خدمة توصيل سريعة وفعالة لجميع أنحاء المملكة'
  },
  {
    icon: Shield,
    title: 'ضمان الجودة',
    description: 'ضمان على جميع المعدات وخدمة صيانة متكاملة'
  },
  {
    icon: Clock,
    title: 'متاح 24/7',
    description: 'خدمة عملاء متاحة على مدار الساعة'
  },
  {
    icon: Star,
    title: 'جودة عالية',
    description: 'معدات عالية الجودة وموثوقة من أفضل الموردين'
  },
  {
    icon: Users,
    title: 'فريق متخصص',
    description: 'فريق من الخبراء لمساعدتك في اختيار المعدات المناسبة'
  },
  {
    icon: CheckCircle,
    title: 'سهولة الاستخدام',
    description: 'منصة سهلة الاستخدام مع واجهة عربية كاملة'
  }
];

const stats = [
  { number: '1000+', label: 'معدة متاحة' },
  { number: '500+', label: 'عميل راضي' },
  { number: '50+', label: 'مدينة' },
  { number: '24/7', label: 'خدمة عملاء' }
];

const FeaturesSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-10 w-64 h-64 bg-yellow-100 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#2C2727]/5 rounded-full"></div>
          </div>
          
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-yellow-100 rounded-full text-yellow-500 text-sm font-medium mb-4">
            مميزاتنا
          </span>
          <h2 className="text-4xl font-bold text-[#2C2727] mb-4">
            لماذا تختار <span className="text-yellow-500">معداتي؟</span>
          </h2>
          <p className="text-[#2C2727]/80 max-w-2xl mx-auto">
            نقدم لك أفضل الخدمات وأحدث المعدات لتلبية احتياجات مشروعك
          </p>
          </div>
          
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="text-yellow-500" size={28} />
            </div>
              <h3 className="text-xl font-bold text-[#2C2727] mb-3">{feature.title}</h3>
              <p className="text-[#2C2727]/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#2C2727] to-yellow-500 rounded-2xl p-12 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-[#F6F4F4]/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
