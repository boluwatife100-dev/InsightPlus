const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'insightplus-secret';
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
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

module.exports = { login, logout };
