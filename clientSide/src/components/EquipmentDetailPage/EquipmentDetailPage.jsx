import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  Calendar,
  Wrench,
  DollarSign,
  Clock,
  MapPin,
  Star,
  Phone,
  Truck,
  Share2,
  MessageSquare,
  BookOpen,
  X,
} from "lucide-react";

export default function EquipmentDetailPage() {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------------
  // من بيانات المستخدم:
  const [userId, setUserId] = useState(null);

  // ----------------------------------
  // التقييمات والتعليقات
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(4.2);
  const [ratingCount, setRatingCount] = useState(12);
  const [userRating, setUserRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [viewCount, setViewCount] = useState(86);
  const [reviewsCount, setReviewsCount] = useState(8);

  // ----------------------------------
  // نموذج طلب التأجير: حالة العرض + الحقول
  const [showRentalRequest, setShowRentalRequest] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [rentalDays, setRentalDays] = useState(0);

  // ----------------------------------
  // صور المعدة
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // ----------------------------------
  // معدات مشابهة
  const [similarEquipment, setSimilarEquipment] = useState([]);

  // ----------------------------------
  // المواقيت المحجوزة
  const [bookedDates, setBookedDates] = useState([]);

  // ----------------------------------
  // جلب بيانات صفحة التفاصيل عند الدخول
  useEffect(() => {
    fetchEquipment();
    fetchReviews();
    getUserIdFromServer();
    incrementViewCount();
    fetchBookedDates();
  }, [id]);

  // جلب معرف المستخدم المسجّل حاليًا
  const getUserIdFromServer = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/get-user", {
        withCredentials: true, 
      });
      if (res.data?.userId) {
        setUserId(res.data.userId);
      }
    } catch (error) {
      console.warn(
        "❌ لم يتم العثور على معرف المستخدم:",
        error.response?.data || error.message
      );
    }
  };

  // جلب بيانات المعدة
  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const equipmentResponse = await axios.get(
        `http://localhost:5000/api/equipment/${id}`
      );
      setEquipment(equipmentResponse.data);
      setSelectedImage(equipmentResponse.data.mainImage);
      // جلب المعدات المشابهة
      fetchSimilarEquipment(equipmentResponse.data.category);
    } catch (error) {
      console.error("❌ خطأ في جلب بيانات المعدات:", error);
    } finally {
      setLoading(false);
    }
  };

  // جلب التقييمات
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/equipment/${id}/reviews`
      );
      const approvedReviews = response.data;
      setReviews(approvedReviews);
      setReviewsCount(approvedReviews.length);
    } catch (error) {
      console.error("❌ خطأ في جلب التقييمات:", error);
    }
  };

  // جلب معدات مشابهة بناءً على التصنيف
  const fetchSimilarEquipment = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/equipment?category=${encodeURIComponent(category)}&limit=3`
      );
      const filtered = response.data.filter((item) => item._id !== id);
      setSimilarEquipment(filtered.slice(0, 3));
    } catch (error) {
      console.error("❌ خطأ في جلب المعدات المشابهة:", error);
    }
  };

  const incrementViewCount = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/equipment/${id}/view`
      );
      if (response.data.views !== undefined) {
        setViewCount(response.data.views);
      }
    } catch (error) {
      console.error("خطأ في تحديث عدد المشاهدات:", error);
    }
  };

  // جلب المواقيت المحجوزة
  const fetchBookedDates = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/rentals/equipment/${id}/booked-dates`);
      setBookedDates(response.data);
    } catch (error) {
      console.error("خطأ في جلب المواقيت المحجوزة:", error);
    }
  };

  // ----------------------------------
  // إرسال التقييم
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) return;
    if (!userId) {
      toast.error("يجب تسجيل الدخول لإضافة تقييم.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/equipment/${id}/rate`, {
        userId: userId,
        content: review,
        rating: userRating,
      });
      toast.success("تم إرسال تقييمك بنجاح.");
      setReview("");
      fetchReviews();
    } catch (error) {
      console.error("❌ خطأ أثناء إضافة التقييم:", error);
      toast.error("حدث خطأ أثناء إضافة التقييم.");
    }
  };

  // إرسال تقييم النجوم فقط
  const submitRating = async (rating) => {
    if (!userId) {
      toast.error("يجب تسجيل الدخول لتقييم المعدات.");
      return;
    }
    setUserRating(rating);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/equipment/${id}/rate`,
        {
          userId: userId,
          rating: rating,
          content: "",
        }
      );
      if (response.data.averageRating !== undefined) {
        setAverageRating(response.data.averageRating);
        setRatingCount(response.data.ratingsCount);
      }
      toast.success("تم تسجيل تقييمك بنجاح!");
    } catch (error) {
      console.error("خطأ في تسجيل التقييم:", error);
      toast.error("حدث خطأ أثناء تسجيل التقييم.");
    }
  };

  // رسم النجوم
  const renderStars = (
    rating,
    setRatingFn = null,
    hover = null,
    setHover = null
  ) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <div
              key={index}
              className={`${setRatingFn ? "cursor-pointer" : ""} text-xl mx-1`}
              onClick={() => setRatingFn && submitRating(ratingValue)}
              onMouseEnter={() => setHover && setHover(ratingValue)}
              onMouseLeave={() => setHover && setHover(0)}
            >
              <Star
                className={`h-6 w-6 ${
                  ratingValue <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // ----------------------------------
  // مشاركة الصفحة
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = equipment?.title || "";
    const text = equipment?.description
      ? equipment.description.substring(0, 100)
      : "";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
            text
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            title + " - " + url
          )}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  // ----------------------------------
  // طلب التواصل (مثال باستخدام sweetalert)
  const handleContactRequest = () => {
    Swal.fire({
      title: "طلب التواصل",
      html: `
        <div class="text-right" dir="rtl">
          <p class="mb-4">سنقوم بالاتصال بك في أقرب وقت ممكن. الرجاء ترك رقم هاتفك:</p>
          <input id="phone" class="w-full p-2 border rounded-md text-right" placeholder="رقم الهاتف" />
        </div>
      `,
      confirmButtonText: "إرسال",
      confirmButtonColor: "#F59E0B",
      showCancelButton: true,
      cancelButtonText: "إلغاء",
      focusConfirm: false,
      preConfirm: () => {
        const phone = Swal.getPopup().querySelector("#phone").value;
        if (!phone) {
          Swal.showValidationMessage("الرجاء إدخال رقم الهاتف");
        }
        return { phone: phone };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("تم إرسال طلب التواصل بنجاح. سنتصل بك قريباً!");
      }
    });
  };

  // ----------------------------------
  // الإبلاغ عن تعليق
  const handleReportReview = async (reviewId) => {
    const { value: reason } = await Swal.fire({
      title: "الإبلاغ عن تقييم",
      input: "textarea",
      inputLabel: "سبب البلاغ",
      inputPlaceholder: "اكتب سبب البلاغ هنا...",
      confirmButtonText: "إرسال",
      confirmButtonColor: "#F59E0B",
      showCancelButton: true,
      cancelButtonText: "إلغاء",
      inputValidator: (value) => {
        if (!value) {
          return "يجب إدخال سبب البلاغ";
        }
      },
    });

    if (!reason) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/reviews/report/${reviewId}`,
        { reason }
      );

      if (response.status === 200) {
        toast.success("تم إرسال البلاغ بنجاح. سيتم مراجعته من قبل المسؤول.");
        fetchReviews();
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الإبلاغ عن التقييم.");
      console.log(error);
    }
  };

  const calculateRentalPrice = (start, end) => {
    if (!start || !end) return;
    
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const diffTime = Math.abs(endDateObj - startDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    setRentalDays(diffDays);
    
    let totalPrice = 0;
    if (diffDays >= 30 && equipment.monthlyRate) {
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      totalPrice = (months * equipment.monthlyRate) + (remainingDays * equipment.dailyRate);
    } else if (diffDays >= 7 && equipment.weeklyRate) {
      const weeks = Math.floor(diffDays / 7);
      const remainingDays = diffDays % 7;
      totalPrice = (weeks * equipment.weeklyRate) + (remainingDays * equipment.dailyRate);
    } else {
      totalPrice = diffDays * equipment.dailyRate;
    }
    
    setCalculatedPrice(totalPrice);
  };

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
      if (endDate) {
        calculateRentalPrice(value, endDate);
      }
    } else {
      setEndDate(value);
      if (startDate) {
        calculateRentalPrice(startDate, value);
      }
    }
  };

  // إضافة دالة للتحقق من التواريخ المحجوزة
  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => {
      const bookedStart = new Date(bookedDate.startDate);
      const bookedEnd = new Date(bookedDate.endDate);
      const checkDate = new Date(date);
      return checkDate >= bookedStart && checkDate <= bookedEnd;
    });
  };

  const handleRentalSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("يجب تسجيل الدخول أولاً!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/rentals",
        {
          userId: userId,
          equipmentId: id, // معرف المعدة
          startDate,
          endDate,
          phoneNumber,
          address,
          price: calculatedPrice,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message || "تم إنشاء طلب التأجير بنجاح");

      // إعادة تعيين الحقول
      setStartDate("");
      setEndDate("");
      setPhoneNumber("");
      setAddress("");
      setShowRentalRequest(false);
    } catch (error) {
      console.error("خطأ في إنشاء طلب التأجير:", error);

      if (error.response?.status === 409) {
        toast.error("⚠️ الفترة المطلوبة محجوزة بالفعل. يرجى اختيار فترة أخرى.");
      } else {
        toast.error("حدث خطأ في إرسال طلب التأجير");
      }
    }
  };

  // ----------------------------------
  // واجهة العرض
  if (loading) {
    return (
      <div className="text-center p-10 text-xl">جارٍ تحميل المعلومات...</div>
    );
  }
  if (!equipment) {
    return (
      <div className="text-center p-10 text-red-500 text-xl">
        المعدات غير موجودة
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl" dir="rtl">
      <ToastContainer />

      {/* فئة المعدات */}
      <div className="mb-4 text-sm text-gray-500 flex gap-2">
        <span>المعدات</span>
        <span>|</span>
        <span>{equipment.category || "غير محدد"}</span>
      </div>

      {/* قسم رئيسي */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* معرض الصور */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <div
              className="w-full h-96 overflow-hidden rounded-lg shadow-md cursor-pointer relative"
              onClick={() => setShowImageModal(true)}
            >
              <img
                src={`http://localhost:5000/${
                  selectedImage || equipment.mainImage
                }`}
                alt={equipment.title}
                className="w-full h-full object-contain bg-gray-100"
              />
              <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm">
                {equipment.condition}
              </div>
            </div>
          </div>

          {/* الصور المصغرة */}
          <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
            <div
              className={`flex-shrink-0 w-24 h-24 cursor-pointer rounded-md overflow-hidden ${
                selectedImage === equipment.mainImage
                  ? "ring-2 ring-yellow-500"
                  : "ring-1 ring-gray-200"
              }`}
              onClick={() => setSelectedImage(equipment.mainImage)}
            >
              <img
                src={`http://localhost:5000/${equipment.mainImage}`}
                alt={equipment.title}
                className="w-full h-full object-cover"
              />
            </div>
            {equipment.additionalImages &&
              equipment.additionalImages.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-24 h-24 cursor-pointer rounded-md overflow-hidden ${
                    selectedImage === image
                      ? "ring-2 ring-yellow-500"
                      : "ring-1 ring-gray-200"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={`http://localhost:5000/${image}`}
                    alt={`${equipment.title} - صورة ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>

          {/* عنوان المعدات والتقييم */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                {equipment.title}
              </h1>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  {renderStars(averageRating)}
                  <span className="mr-2 text-yellow-500 font-bold">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {ratingCount} تقييم
                </span>
              </div>
            </div>
          </div>

          {/* وصف المعدات */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-yellow-500" />
              <span>الوصف</span>
            </h2>
            <div className="text-gray-700 leading-relaxed">
              <p>{equipment.description}</p>
            </div>
          </div>

          {/* المواصفات الفنية */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-yellow-500" />
              <span>المواصفات الفنية</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-500">المصنع:</span>
                    <span className="font-medium">
                      {equipment.manufacturer}
                    </span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-500">الموديل:</span>
                    <span className="font-medium">{equipment.model}</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-500">سنة الصنع:</span>
                    <span className="font-medium">{equipment.year}</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-500">الحالة:</span>
                    <span className="font-medium">{equipment.condition}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">المواصفات الإضافية:</h3>
                <div className="text-gray-700">{equipment.technicalSpecs}</div>
              </div>
            </div>
          </div>

          {/* المميزات */}
          {equipment.features && equipment.features.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">المميزات</h2>
              <div className="flex flex-wrap gap-2">
                {equipment.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-block bg-white px-3 py-1 rounded-full text-sm border border-gray-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* شروط وأحكام التأجير */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-500" />
              <span>شروط وأحكام التأجير</span>
            </h2>
            <div className="text-gray-700 leading-relaxed">
              <p>{equipment.rentalTerms || "لا توجد شروط إضافية محددة."}</p>
            </div>
          </div>

          {/* بار الإحصائيات (مشاهدات / مشاركة ... إلخ) */}
          <div className="flex items-center justify-between mb-8 py-3 px-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-8 space-x-reverse">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 ml-1" />
                <span className="text-gray-600">
                  الحد الأدنى للتأجير: {equipment.minRentalDays} يوم
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 ml-1" />
                <span className="text-gray-600">{equipment.location}</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-500 ml-1" />
                <span className="text-gray-600">
                  {equipment.deliveryOptions}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center text-gray-600 hover:text-green-600"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* قسم جانبي - معلومات السعر والحجز */}
        <div className="lg:col-span-1">
          {/* بطاقة التسعير */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              <span>أسعار التأجير</span>
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">سعر التأجير اليومي:</span>
                <span className="font-bold text-lg text-yellow-500">
                  {equipment.dailyRate} دينار
                </span>
              </div>

              {equipment.weeklyRate && (
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-700">سعر التأجير الأسبوعي:</span>
                  <span className="font-bold">
                    {equipment.weeklyRate} دينار
                  </span>
                </div>
              )}

              {equipment.monthlyRate && (
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-700">سعر التأجير الشهري:</span>
                  <span className="font-bold">
                    {equipment.monthlyRate} دينار
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">مبلغ التأمين:</span>
                <span className="font-bold">
                  {equipment.depositAmount} دينار
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowRentalRequest(true)}
              className="bg-yellow-500  w-full text-white py-2 rounded-md text-center mb-3"
            >
              طلب تأجير
            </button>

            <button
              onClick={handleContactRequest}
              className="bg-yellow-500 w-full text-white py-2 rounded-md text-center"
            >
              <Phone className="inline-block mr-1 h-4 w-4" />
              طلب مكالمة
            </button>
          </div>
        </div>
      </div>

      {/* قسم التقييمات والمراجعات */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-yellow-500" />
          آراء المستخدمين
        </h3>
        <div className="mb-4">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">
                  {rev.userId?.name || "مستخدم"}
                </h4>
                <button
                  onClick={() => handleReportReview(rev._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  الإبلاغ
                </button>
              </div>
              <p className="text-gray-600">{rev.content}</p>
              <div className="text-sm text-gray-400 mt-1">
                التقييم: {rev.rating} نجوم
              </div>
            </div>
          ))}
        </div>

        {/* إضافة تقييم جديد */}
        {userId ? (
          <form onSubmit={handleReviewSubmit}>
            <div className="flex items-center mb-2">
              {renderStars(
                userRating,
                setUserRating,
                tempRating,
                setTempRating
              )}
            </div>
            <textarea
              className="w-full border rounded p-2 mb-2"
              rows="3"
              placeholder="أضف تعليقك..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              إرسال التقييم
            </button>
          </form>
        ) : (
          <p className="text-gray-500">
            يجب <strong>تسجيل الدخول</strong> لإضافة تقييم.
          </p>
        )}
      </div>

      {/* معدات مشابهة */}
      {similarEquipment.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">معدات مشابهة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {similarEquipment.map((item) => (
              <div key={item._id} className="border p-4 rounded">
                <img
                  src={`http://localhost:5000/${item.mainImage}`}
                  alt={item.title}
                  className="w-full h-48 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">
                  سعر اليوم: {item.dailyRate} دينار
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* نافذة تكبير الصورة (اختياري) */}
      {showImageModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowImageModal(false)}
        >
          <img
            src={`http://localhost:5000/${selectedImage}`}
            alt="Enlarged"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* نافذة (Modal) طلب التأجير */}
      {showRentalRequest && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setShowRentalRequest(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">طلب التأجير</h2>
              <button
                onClick={() => setShowRentalRequest(false)}
                className="text-gray-500 hover:text-yellow-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleRentalSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    تاريخ البداية
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                    value={startDate}
                    onChange={(e) => handleDateChange('start', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    onFocus={(e) => {
                      const input = e.target;
                      input.addEventListener('input', () => {
                        if (isDateBooked(input.value)) {
                          toast.warning('هذا التاريخ محجوز، يرجى اختيار تاريخ آخر');
                          input.value = '';
                          setStartDate('');
                        }
                      });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    تاريخ النهاية
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                    value={endDate}
                    onChange={(e) => handleDateChange('end', e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    required
                    onFocus={(e) => {
                      const input = e.target;
                      input.addEventListener('input', () => {
                        if (isDateBooked(input.value)) {
                          toast.warning('هذا التاريخ محجوز، يرجى اختيار تاريخ آخر');
                          input.value = '';
                          setEndDate('');
                        }
                      });
                    }}
                  />
                </div>
              </div>

              {(startDate && endDate) && (
                <div className="bg-gray-800/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-800 font-medium">مدة التأجير</span>
                    <span className="text-yellow-500 font-bold">{rentalDays} يوم</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">السعر الإجمالي</span>
                    <span className="text-yellow-500 font-bold text-xl">{calculatedPrice} دينار</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="07XXXXXXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  العنوان
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="أدخل عنوانك الكامل"
                  required
                />
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-800 mb-2">التواريخ المحجوزة:</h3>
                <div className="flex flex-wrap gap-2">
                  {bookedDates.map((bookedDate, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded"
                    >
                      {new Date(bookedDate.startDate).toLocaleDateString('ar-SA')} - {new Date(bookedDate.endDate).toLocaleDateString('ar-SA')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRentalRequest(false)}
                  className="px-6 py-3 text-gray-800 hover:text-yellow-500 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-gray-800 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  إرسال الطلب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
