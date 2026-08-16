const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ detail: 'Authentication required.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'InsightLoop-secret';
    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.userId).select('-passwordHash');

    if (!user) {
      return res.status(401).json({ detail: 'Invalid or expired token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ detail: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
