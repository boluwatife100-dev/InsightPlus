const Feedback = require('../models/Feedback');

const inferSentiment = (rating) => {
  if (rating >= 4) return 'positive';
  if (rating === 3) return 'neutral';
  return 'negative';
};

const createFeedback = async (req, res, next) => {
  try {
    const { rating, category, comment, author, emotion, productRating, serviceRating, teamRating, contactRequested, contactName, contactEmail } = req.body;
    const feedback = await Feedback.create({
      author: contactName ? contactName.trim() : (author && author.toString().trim() ? author.toString().trim() : 'Anonymous'),
      comment: comment.toString().trim(),
      rating: Number(rating),
      category: category.toString().trim(),
      sentiment: inferSentiment(Number(rating)),
      emotion,
      productRating: productRating ? Number(productRating) : undefined,
      serviceRating: serviceRating ? Number(serviceRating) : undefined,
      teamRating: teamRating ? Number(teamRating) : undefined,
      contactRequested: Boolean(contactRequested),
      contactName: contactName ? contactName.toString().trim() : undefined,
      contactEmail: contactEmail ? contactEmail.toString().trim() : undefined,
    });

    res.status(201).json({
      id: feedback.id,
      author: feedback.author,
      rating: feedback.rating,
      category: feedback.category,
      sentiment: feedback.sentiment,
      comment: feedback.comment,
      emotion: feedback.emotion,
      productRating: feedback.productRating,
      serviceRating: feedback.serviceRating,
      teamRating: feedback.teamRating,
      contactRequested: feedback.contactRequested,
      contactName: feedback.contactName,
      contactEmail: feedback.contactEmail,
      createdAt: feedback.createdAt.toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

const listFeedback = async (req, res, next) => {
  try {
    const { q, sentiment, category } = req.query;
    const filter = {};

    if (sentiment) {
      filter.sentiment = sentiment;
    }
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (q) {
      filter.$or = [
        { comment: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
      ];
    }

    const feedback = await Feedback.find(filter).sort({ createdAt: -1 }).lean();
    const items = feedback.map((item) => ({
      id: item._id.toString(),
      author: item.author,
      rating: item.rating,
      category: item.category,
      sentiment: item.sentiment,
      comment: item.comment,
      emotion: item.emotion,
      productRating: item.productRating,
      serviceRating: item.serviceRating,
      teamRating: item.teamRating,
      createdAt: item.createdAt.toISOString(),
    }));

    res.json(items);
  } catch (error) {
    next(error);
  }
};

const getIssues = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().lean();
    const counts = feedback.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    const total = feedback.length || 1;
    const issues = Object.entries(counts)
      .map(([label, count]) => ({ label, pct: Math.round((count / total) * 100) }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 5);

    res.json(issues);
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().lean();
    const total = feedback.length;
    const average = total
      ? (feedback.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1)
      : '0.0';
    const sentimentCounts = feedback.reduce(
      (acc, item) => {
        acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
        return acc;
      },
      { positive: 0, neutral: 0, negative: 0 },
    );

    res.json({
      totalResponses: total,
      averageRating: average,
      sentimentCounts,
      categories: feedback.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {}),
    });
  } catch (error) {
    next(error);
  }
};

const getSatisfactionTrend = async (req, res, next) => {
  try {
    const now = new Date();
    const trend = [];

    for (let i = 6; i >= 0; i -= 1) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);
      day.setHours(0, 0, 0, 0);
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);

      const dayFeedback = await Feedback.find({
        createdAt: { $gte: day, $lt: nextDay },
      }).lean();

      const score = dayFeedback.length
        ? Number((dayFeedback.reduce((sum, item) => sum + item.rating, 0) / dayFeedback.length).toFixed(1))
        : 0;

      trend.push({ day: day.toISOString().slice(0, 10), score });
    }

    res.json(trend);
  } catch (error) {
    next(error);
  }
};

module.exports = { createFeedback, listFeedback, getIssues, getStats, getSatisfactionTrend };
