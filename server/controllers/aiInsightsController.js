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
      const feedbackCount = await Feedback.countDocuments({ business: business._id });
      return res.json({
        summary: latestInsight.summary,
        recommendedAction: latestInsight.recommendedAction,
        issues: latestInsight.issues,
        updatedAt: latestInsight.updatedAt,
        totalResponses: feedbackCount
      });
    }

    const feedbackCount = await Feedback.countDocuments({ business: business._id });
    if (feedbackCount === 0) {
      return res.json({
        summary: {
          text: 'No feedback data yet. Please share your feedback link with customers to start collecting insights and discover actionable themes for your business.',
          highlights: ['share your feedback link'],
        },
        recommendedAction: {
          text: 'Copy your feedback link and share it with your customers to get started.',
        },
        issues: [],
        totalResponses: 0
      });
    }

    // Default fallback if no insights have ever been generated for this business
    const allFeedback = await Feedback.find({ business: business._id }).lean();
    const categoryCounts = {};
    allFeedback.forEach(f => {
      categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
    });
    
    let topIssues = Object.entries(categoryCounts)
      .map(([label, count]) => ({
        label,
        pct: Math.round((count / feedbackCount) * 100),
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    let summary = {
      text: 'You have new feedback! Click "Get Latest AI Insight" to generate a deep AI analysis and discover actionable themes for your business.',
      highlights: ['Get Latest AI Insight'],
    };
    
    let recommendedAction = {
      text: 'Click the generate button above to get your first AI-driven recommended action.',
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
      updatedAt: newInsight.updatedAt,
      totalResponses: feedback.length
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getInsights, generateInsights };
