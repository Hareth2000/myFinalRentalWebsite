// ✅ controllers/rentalController.js
const Rental = require("../models/Rental");

// دالة لفحص التداخل بين الفترات
const isOverlapping = (existingStart, existingEnd, newStart, newEnd) => {
  return (
    (newStart >= existingStart && newStart < existingEnd) ||
    (newEnd > existingStart && newEnd <= existingEnd) ||
    (newStart <= existingStart && newEnd >= existingEnd)
  );
};

// // إنشاء طلب تأجير جديد
// const createRental = async (req, res) => {
//   try {
//     const { userId, equipmentId, startDate, endDate, phoneNumber, address } =
//       req.body;

//     // التحقق من البيانات الأساسية
//     if (!userId || !equipmentId || !startDate || !endDate) {
//       return res.status(400).json({ message: "بيانات مفقودة" });
//     }

//     const newStart = new Date(startDate);
//     const newEnd = new Date(endDate);

//     // التحقق من وجود أي حجز مقبول ومتداخل مع الفترة المطلوبة
//     const existingRentals = await Rental.find({
//       equipment: equipmentId,
//       status: "accepted",
//     });

//     for (const rental of existingRentals) {
//       const existingStart = new Date(rental.startDate);
//       const existingEnd = new Date(rental.endDate);

//       if (isOverlapping(existingStart, existingEnd, newStart, newEnd , price )) {
//         return res
//           .status(409)
//           .json({ message: "الفترة المطلوبة محجوزة مسبقًا." });
//       }
//     }

//     // إنشاء الطلب الجديد
//     const newRental = new Rental({
//       user: userId,
//       equipment: equipmentId,
//       startDate: newStart,
//       endDate: newEnd,
//       phoneNumber,
//       address,
//       price,
//       status: "pending",
//     });

//     await newRental.save();

//     res.status(201).json({
//       message: "تم إنشاء طلب التأجير بنجاح",
//       rentalId: newRental._id,
//     });
//   } catch (error) {
//     console.error("خطأ في إنشاء طلب التأجير:", error);
//     res.status(500).json({ message: "حدث خطأ عند إنشاء طلب التأجير" });
//   }
// };

// إنشاء طلب تأجير جديد
const createRental = async (req, res) => {
  try {
    const { userId, equipmentId, startDate, endDate, phoneNumber, address, price } = req.body; // أضفنا 'price'

    // التحقق من البيانات الأساسية
    if (!userId || !equipmentId || !startDate || !endDate || !price) { // تحقق من السعر هنا
      return res.status(400).json({ message: "بيانات مفقودة" });
    }

    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);

    // التحقق من وجود أي حجز مقبول ومتداخل مع الفترة المطلوبة
    const existingRentals = await Rental.find({
      equipment: equipmentId,
      status: "accepted",
    });

    for (const rental of existingRentals) {
      const existingStart = new Date(rental.startDate);
      const existingEnd = new Date(rental.endDate);

      // دالة التحقق من التداخل بين التواريخ
      if (isOverlapping(existingStart, existingEnd, newStart, newEnd)) {
        return res
          .status(409)
          .json({ message: "الفترة المطلوبة محجوزة مسبقًا." });
      }
    }

    // إنشاء الطلب الجديد
    const newRental = new Rental({
      user: userId,
      equipment: equipmentId,
      startDate: newStart,
      endDate: newEnd,
      phoneNumber,
      address,
      price, // أضفنا السعر هنا
      status: "pending",
    });

    await newRental.save();

    res.status(201).json({
      message: "تم إنشاء طلب التأجير بنجاح",
      rentalId: newRental._id,
    });
  } catch (error) {
    console.error("خطأ في إنشاء طلب التأجير:", error);
    res.status(500).json({ message: "حدث خطأ عند إنشاء طلب التأجير" });
  }
};

// جلب الطلبات الخاصة بمؤجّر محدد (عبر ownerId)
const getRentalsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.query;
    if (!ownerId) {
      return res
        .status(400)
        .json({ message: "يجب توفير معرف المالك (ownerId)" });
    }

    const allRentals = await Rental.find()
      .populate({
        path: "equipment",
        match: { ownerId },
      })
      .populate("user", "name email phoneNumber");

    const filtered = allRentals.filter((r) => r.equipment !== null);

    return res.json(filtered);
  } catch (error) {
    console.error("خطأ في جلب الطلبات:", error);
    res.status(500).json({ message: "حدث خطأ عند جلب الطلبات" });
  }
};

// تحديث حالة الطلب (قبول / رفض / مدفوع / ملغي...)
const updateRentalStatus = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "accepted",
      "rejected",
      "paid",
      "cancelled",
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "قيمة حالة الطلب غير صالحة." });
    }

    const rental = await Rental.findByIdAndUpdate(
      rentalId,
      { status },
      { new: true }
    ).populate("user", "name email");

    if (!rental) {
      return res.status(404).json({ message: "لم يتم العثور على الطلب" });
    }

    return res.json({
      message: "تم تحديث حالة الطلب بنجاح",
      rental,
    });
  } catch (error) {
    console.error("خطأ في تحديث حالة الطلب:", error);
    return res
      .status(500)
      .json({ message: "فشل في تحديث حالة الطلب", error: error.message });
  }
};

// جلب المواقيت المحجوزة لمعدة معينة
const getBookedDates = async (req, res) => {
  try {
    const { equipmentId } = req.params;

    // جلب جميع طلبات التأجير المقبولة لهذه المعدة
    const rentals = await Rental.find({
      equipment: equipmentId,
      status: { $in: ["accepted", "pending"] },
    }).select("startDate endDate");

    // تحويل التواريخ إلى التنسيق المطلوب
    const bookedDates = rentals.map((rental) => ({
      startDate: rental.startDate,
      endDate: rental.endDate,
    }));

    res.status(200).json(bookedDates);
  } catch (error) {
    console.error("خطأ في جلب المواقيت المحجوزة:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء جلب المواقيت المحجوزة",
      error: error.message,
    });
  }
};

// جلب جميع طلبات التأجير للمستخدم
const getUserRentals = async (req, res) => {
  try {
    // التحقق من وجود req.user
    if (!req.user) {
      console.log("No user found in request");
      return res.status(401).json({ message: "User not authenticated" });
    }

    // استخدام id بدلاً من _id
    const userId = req.user.id;
    console.log("Current user ID from token:", userId);
    console.log("Complete req.user object:", JSON.stringify(req.user, null, 2));
    
    if (!userId) {
      console.log("No user ID found in token");
      return res.status(400).json({ message: "User ID not found in token" });
    }

    // التأكد من أن معرف المستخدم في الشكل الصحيح
    const rentals = await Rental.find({ user: userId })
      .populate({
        path: 'equipment',
        select: 'title mainImage manufacturer model dailyRate'
      })
      .sort({ createdAt: -1 });

    console.log("Query used:", { user: userId });
    console.log("Found rentals:", JSON.stringify(rentals, null, 2));

    res.status(200).json(rentals);
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({
      message: "حدث خطأ أثناء جلب طلبات التأجير",
      error: error.message,
      details: error.stack
    });
  }
};

module.exports = {
  createRental,
  getRentalsByOwner,
  updateRentalStatus,
  getBookedDates,
  getUserRentals
};
