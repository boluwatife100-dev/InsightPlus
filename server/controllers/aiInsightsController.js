const Feedback = require('../models/Feedback');

const getInsights = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 }).lean();
    const topIssues = [
      { label: 'Service', pct: 48 },
      { label: 'Food quality', pct: 26 },
      { label: 'Cleanliness', pct: 16 },
    ];

    res.json({
      summary: {
        text: 'Customers are enjoying the core menu, but recurring service and cleanliness issues are keeping overall sentiment from reaching the next level.',
        highlights: ['core menu', 'service', 'cleanliness'],
      },
      recommendedAction: {
        text: 'Train the team on a standard closing checklist and add an extra cleanup shift after peak hours.',
      },
      issues: topIssues,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getInsights };
