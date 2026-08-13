const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Business = require('../models/Business');

const createToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'InsightLoop-secret';
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

const signup = async (req, res, next) => {
  try {
    const { email, password, businessName } = req.body;

    if (!email || !password || !businessName) {
      return res.status(400).json({ detail: 'Email, password, and business name are required.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ detail: 'Email is already registered.' });
    }

    const user = new User({
      email: email.toLowerCase().trim(),
      passwordHash: password,
      name: 'Owner',
      role: 'Owner'
    });
    user.initials = 'OW';

    await user.save();

    const initials = businessName
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0].toUpperCase())
      .slice(0, 2)
      .join('');

    const business = new Business({
      name: businessName.trim(),
      initials: initials || 'B',
      email: user.email,
      owner: user.id,
      current: true,
      plan: 'pro'
    });
    
    await business.save();

    const token = createToken(user.id);
    const payload = {
      name: user.name,
      initials: user.initials,
      role: user.role,
      email: user.email,
    };

    res.status(201).json({ token, user: payload });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ detail: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).json({ detail: 'Invalid email or password.' });
    }

    const token = createToken(user.id);
    const payload = {
      name: user.name,
      initials: user.initials,
      role: user.role,
      email: user.email,
    };

    res.json({ token, user: payload });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.status(204).end();
};

module.exports = { login, signup, logout };
