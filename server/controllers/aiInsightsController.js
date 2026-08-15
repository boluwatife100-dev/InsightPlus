const Feedback = require('../models/Feedback');
const AiInsight = require('../models/AiInsight');
const Business = require('../models/Business');
const { generateInsight } = require('../utils/geminiHelper');

const getInsights = async (req, res, next) => {
  try {
    const business = await Business.findOne({ owner: req.user.id, current: true }) 
      || await Business.findOne({ owner: req.user.id }).sort({ createdAt: 1 });

    if (!business) {
      return res.status(404).json({ detail: 'No business found.' });
    }

    const latestInsight = await AiInsight.findOne({ business: business._id }).sort({ createdAt: -1 });

    if (latestInsight) {
      return res.json({
        summary: latestInsight.summary,
        recommendedAction: latestInsight.recommendedAction,
        issues: latestInsight.issues,
        updatedAt: latestInsight.updatedAt
      });
    }

    // Default fallback if no insights have ever been generated for this business
    let topIssues = [
      { label: 'Service', pct: 48, count: 576 },
      { label: 'Food quality', pct: 26, count: 312 },
      { label: 'Cleanliness', pct: 16, count: 192 },
    ];

    let summary = {
      text: 'Customers are enjoying the core menu, but recurring service and cleanliness issues are keeping overall sentiment from reaching the next level.',
      highlights: ['core menu', 'service', 'cleanliness'],
    };
    
    let recommendedAction = {
      text: 'Train the team on a standard closing checklist and add an extra cleanup shift after peak hours.',
    };

    res.json({
      summary,
      recommendedAction,
      issues: topIssues,
    });
  } catch (error) {
    next(error);
  }
};

const generateInsights = async (req, res, next) => {
  try {
    const business = await Business.findOne({ owner: req.user.id, current: true }) 
      || await Business.findOne({ owner: req.user.id }).sort({ createdAt: 1 });

    if (!business) {
      return res.status(404).json({ detail: 'No business found.' });
    }

    const feedback = await Feedback.find().sort({ createdAt: -1 }).lean();
    
    const aiData = await generateInsight(feedback.map(f => ({ rating: f.rating, comment: f.comment, category: f.category })));

    if (!aiData) {
      return res.status(500).json({ detail: 'Failed to generate AI insights.' });
    }

    const newInsight = new AiInsight({
      business: business._id,
      summary: aiData.aiSummary,
      recommendedAction: aiData.recommendedAction,
      issues: aiData.frictionPoints || [],
    });

    await newInsight.save();

    res.json({
      summary: newInsight.summary,
      recommendedAction: newInsight.recommendedAction,
      issues: newInsight.issues,
      updatedAt: newInsight.updatedAt
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getInsights, generateInsights };
