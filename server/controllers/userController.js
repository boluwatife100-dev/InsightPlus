const getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ detail: 'Unauthorized.' });
    }

    res.json({
      name: req.user.name,
      initials: req.user.initials,
      role: req.user.role,
      email: req.user.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMe };
