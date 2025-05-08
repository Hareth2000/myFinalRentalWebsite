const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
          return res.status(401).json({ message: 'غير مصرح لك بالوصول' });
        }

        next();
      } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'غير مصرح لك بالوصول' });
      }
    }

    if (!token) {
      res.status(401).json({ message: 'غير مصرح لك بالوصول' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'حدث خطأ في المصادقة' });
  }
};

module.exports = { protect }; 