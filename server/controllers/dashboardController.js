const Feedback = require('../models/Feedback');

const getOverview = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const match = {};

    if (from || to) {
      match.createdAt = {};
      if (from) match.createdAt.$gte = new Date(from);
      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        match.createdAt.$lte = toDate;
      }
    }

    const allFeedback = await Feedback.find(match).sort({ createdAt: -1 }).lean();

    const scoreCount = allFeedback.length;
    const averageScore = scoreCount
      ? (allFeedback.reduce((sum, item) => sum + item.rating, 0) / scoreCount).toFixed(1)
      : '0.0';

    const distribution = [5, 4, 3, 2, 1].map((rating) =>
      allFeedback.filter((item) => item.rating === rating).length,
    );

    const spark = Array.from({ length: 7 }, (_, idx) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - idx));
      const stamp = date.toISOString().slice(0, 10);
      const values = allFeedback
        .filter((item) => item.createdAt.toISOString().slice(0, 10) === stamp)
        .map((item) => item.rating);
      return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
    });

    const responseSpark = allFeedback.slice(0, 7).map((item) => item.rating);
    const newResponses = {
      count: scoreCount,
      delta: scoreCount > 0 ? '▲ 12% vs prior period' : '0% vs prior period',
      spark: responseSpark,
    };

    const aiSummary = {
      text: 'Customers are mostly happy, but service speed and order accuracy still need attention. Improve training on order handoff and pre-check customer preferences to reduce friction.',
      highlights: ['service speed', 'order accuracy', 'customer preferences'],
    };

    const recommendedAction = {
      text: 'Improve table turnover by introducing a small express service checklist for front-of-house staff.',
    };

    const frictionPoints = [
      { label: 'Slow service', pct: 42 },
      { label: 'Food temperature', pct: 27 },
      { label: 'Order accuracy', pct: 18 },
    ];

    const recentFeedback = allFeedback.slice(0, 8).map((item) => ({
      id: item.id,
      author: item.author,
      rating: item.rating,
      category: item.category,
      sentiment: item.sentiment,
      comment: item.comment,
      createdAt: item.createdAt.toISOString(),
    }));

    res.json({
      csat: {
        score: averageScore,
        outOf: 5,
        delta: scoreCount ? '▼ 12% vs Jun 1–30' : '0%',
        responses: `${scoreCount} responses`,
        spark,
        stars: distribution,
        distribution,
      },
      newResponses,
      aiSummary,
      recommendedAction,
      frictionPoints,
      recentFeedback,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOverview };
