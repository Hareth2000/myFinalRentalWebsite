import React, { useEffect } from "react";
import { Wrench } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import CategoriesSection from "./CategoriesSection";
import FeaturedEquipmentSection from "./FeaturedEquipmentSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";
import NewsletterSection from "./NewsletterSection";
import HeroVideo from "./HeroSlider";

import FirstSlider from "./FirstSlider.jpg";

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة الأنيميشن
      once: true, // تشغيل الأنيميشن مرة واحدة فقط
    });
  }, []);

  const categories = [
    {
      id: 1,
      name: "معدات البناء",
      icon: <Wrench size={24} className="text-yellow-500" />,
      image: "src/assets/images/equipment/pexels-instasky-14688876.jpg",
      count: 28,
    },
    {
      id: 2,
      name: "الرافعات",
      icon: <Wrench size={24} className="text-yellow-500" />,
      image: "src/assets/images/equipment/pexels-instasky-14688876.jpg",
      count: 15,
    },
    {
      id: 3,
      name: "الحفارات",
      icon: <Wrench size={24} className="text-yellow-500" />,
      image: "src/assets/images/equipment/pexels-instasky-14688876.jpg",
      count: 20,
    },
    {
      id: 4,
      name: "المولدات",
      icon: <Wrench size={24} className="text-yellow-500" />,
      image: FirstSlider,
      count: 12,
    },
  ];

  const featuredEquipment = [
    {
      id: 1,
      name: "حفارة هيدروليكية كاتربيلر",
      image: "src/assets/images/equipment/pexels-instasky-14688876.jpg",
      category: "حفارات",
      rating: 4.8,
      ratingCount: 56,
      dailyRate: 1200,
      available: true,
      specs: ["قوة 320 حصان", "وزن 20 طن", "عمق حفر 6 متر"],
      location: "عمان",
    },
    {
      id: 2,
      name: "رافعة شوكية تويوتا",
      image: "src/assets/images/equipment/pexels-instasky-14688876.jpg",
      category: "رافعات",
      rating: 4.5,
      ratingCount: 42,
      dailyRate: 800,
      available: true,
      specs: ["قدرة رفع 5 طن", "ارتفاع رفع 6 متر", "محرك ديزل"],
      location: "الزرقاء",
    },
    {
      id: 3,
      name: "شاحنة خلاطة أسمنت مرسيدس",
      image: "src/assets/images/equipment/pexels-instasky-14688876.jpg",
      category: "شاحنات",
      rating: 4.7,
      ratingCount: 38,
      dailyRate: 950,
      available: false,
      specs: ["سعة 8 متر مكعب", "موديل 2022", "قوة 400 حصان"],
      location: "إربد",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "م. أحمد العبادي",
      position: "شركة البناء المتحدة",
      image: "/api/placeholder/400/400",
      comment:
        "تجربة ممتازة مع معدات تك! المعدات كانت بحالة ممتازة والتوصيل كان في الموعد المحدد. سأتعامل معهم مجدداً في مشاريعي القادمة.",
      rating: 5,
    },
    {
      id: 2,
      name: "م. سمير الزعبي",
      position: "مقاول مشاريع",
      image: "/api/placeholder/400/400",
      comment:
        "توفير المعدات الصناعية بهذه السهولة وفر علينا الكثير من الوقت والجهد. الأسعار كانت تنافسية جداً والدعم الفني كان متواجد طوال الوقت.",
      rating: 5,
    },
  ];

  return (
    <div className="font-sans bg-[#F6F4F4]" dir="rtl">
      <div className="space-y-15">
        <HeroVideo />

        <div className="relative" data-aos="fade-up">
          <CategoriesSection categories={categories} />
          <div className="absolute -bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>
        </div>

        <div className="relative" data-aos="fade-up">
          <FeaturedEquipmentSection equipment={featuredEquipment} />
          <div className="absolute -bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>
        </div>

        <div className="relative" data-aos="fade-up">
          <FeaturesSection />
          <div className="absolute -bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>
        </div>

        <div className="relative" data-aos="fade-up">
          <HowItWorksSection />
          <div className="absolute -bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>
        </div>

        <div className="relative" data-aos="fade-up">
          <TestimonialsSection testimonials={testimonials} />
          <div className="absolute -bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>
        </div>

        <div className="relative" data-aos="fade-up">
          <ServicesSection />
          <div className="absolute -bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>
        </div>

        <div className="relative" data-aos="fade-up">
          <ContactSection />
          <div className="absolute -bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>
        </div>

        <NewsletterSection data-aos="fade-up" />
      </div>
      <br />
      <br />
    </div>
  );
};

export default HomePage;
