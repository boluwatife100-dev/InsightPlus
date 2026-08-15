const Feedback = require('../models/Feedback');
const AiInsight = require('../models/AiInsight');
const Business = require('../models/Business');

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

    // Query for previous month's data to calculate real delta
    let prevAverageScore = 0;
    if (from && to) {
      const fromDate = new Date(from);
      const prevFrom = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, 1);
      const prevTo = new Date(fromDate.getFullYear(), fromDate.getMonth(), 0);
      prevTo.setHours(23, 59, 59, 999);

      const prevFeedback = await Feedback.find({
        createdAt: { $gte: prevFrom, $lte: prevTo }
      }).lean();

      if (prevFeedback.length > 0) {
        prevAverageScore = prevFeedback.reduce((sum, item) => sum + item.rating, 0) / prevFeedback.length;
      }
    }

    const scoreCount = allFeedback.length;
    const averageScoreNum = scoreCount
      ? allFeedback.reduce((sum, item) => sum + item.rating, 0) / scoreCount
      : 0;
    const averageScore = averageScoreNum.toFixed(1);

    let deltaStr = '0%';
    if (prevAverageScore > 0 && scoreCount > 0) {
      const diff = averageScoreNum - prevAverageScore;
      const pct = (Math.abs(diff) / prevAverageScore) * 100;
      deltaStr = `${diff >= 0 ? '▲' : '▼'} ${pct.toFixed(1)}%`;
    } else if (scoreCount > 0 && prevAverageScore === 0) {
      deltaStr = `▲ 100%`;
    }

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

    const recentFeedback = allFeedback.slice(0, 8).map((item) => ({
      id: item.id,
      author: item.author,
      rating: item.rating,
      category: item.category,
      sentiment: item.sentiment,
      comment: item.comment,
      createdAt: item.createdAt.toISOString(),
    }));

    const business = await Business.findOne({ owner: req.user.id, current: true }) 
      || await Business.findOne({ owner: req.user.id }).sort({ createdAt: 1 });

    let latestInsight = null;
    if (business) {
      latestInsight = await AiInsight.findOne({ business: business._id }).sort({ createdAt: -1 });
    }

    let aiSummary = {
      text: 'Customers are mostly happy, but service speed and order accuracy still need attention. Improve training on order handoff and pre-check customer preferences to reduce friction.',
      highlights: ['service speed', 'order accuracy', 'customer preferences'],
    };
    let recommendedAction = {
      text: 'Improve table turnover by introducing a small express service checklist for front-of-house staff.',
    };
    let frictionPoints = [
      { label: 'Slow delivery', pct: 42 },
      { label: 'Long wait time', pct: 21 },
      { label: 'Pricing concerns', pct: 13},
      { label: 'App Glitches', pct: 9 },
      { label: 'Other', pct: 15 },
    ];

    if (latestInsight) {
      aiSummary = latestInsight.summary;
      recommendedAction = latestInsight.recommendedAction;
      frictionPoints = latestInsight.issues;
    }

    res.json({
      csat: {
        score: averageScore,
        outOf: 5,
        delta: deltaStr,
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

