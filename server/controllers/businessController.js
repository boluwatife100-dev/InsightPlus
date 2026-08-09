const Business = require('../models/Business');

const listBusinesses = async (req, res, next) => {
  try {
    const businesses = await Business.find({ owner: req.user.id }).sort({ name: 1 });
    res.json(businesses.map((biz) => ({
      id: biz.id,
      name: biz.name,
      initials: biz.initials,
      plan: biz.plan,
      email: biz.email,
    })));
  } catch (error) {
    next(error);
  }
};

const getCurrentBusiness = async (req, res, next) => {
  try {
    let business = await Business.findOne({ owner: req.user.id, current: true });

    if (!business) {
      business = await Business.findOne({ owner: req.user.id }).sort({ createdAt: 1 });
    }

    if (!business) {
      return res.status(404).json({ detail: 'No business found.' });
    }

    res.json({
      id: business.id,
      name: business.name,
      initials: business.initials,
      plan: business.plan,
      email: business.email,
    });
  } catch (error) {
    next(error);
  }
};

const updateCurrentBusiness = async (req, res, next) => {
  try {
    const payload = {};
    if (req.body.name) payload.name = req.body.name.toString().trim();
    if (req.body.email) payload.email = req.body.email.toString().trim();

    const business = await Business.findOne({ owner: req.user.id, current: true });

    if (!business) {
      return res.status(404).json({ detail: 'No active business found.' });
    }

    if (payload.name) {
      business.name = payload.name;
      business.initials = payload.name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0].toUpperCase())
        .slice(0, 2)
        .join('');
    }
    if (payload.email) {
      business.email = payload.email;
    }

    await business.save();

    res.json({
      id: business.id,
      name: business.name,
      initials: business.initials,
      plan: business.plan,
      email: business.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listBusinesses, getCurrentBusiness, updateCurrentBusiness };
