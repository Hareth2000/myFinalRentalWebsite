const express = require('express');
const router = express.Router();
const { 
  createRentalRequest, 
  updateRentalRequestStatus,
  getUserRentalRequests,
  getEquipmentRentalRequests
} = require('../controllers/rentalRequestController');
const auth = require('../middleware/auth');

// إنشاء طلب تأجير جديد
router.post('/', auth, createRentalRequest);

// تحديث حالة طلب التأجير
router.put('/:rentalRequestId/status', auth, updateRentalRequestStatus);

// جلب طلبات التأجير للمستخدم
router.get('/user', auth, getUserRentalRequests);

// جلب طلبات التأجير للمعدات
router.get('/equipment/:equipmentId', auth, getEquipmentRentalRequests);

module.exports = router; 