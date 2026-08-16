const express = require('express');
const validateFeedback = require('../middleware/validateFeedback');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createFeedback,
  listFeedback,
  getIssues,
  getStats,
  getSatisfactionTrend,
} = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', validateFeedback, createFeedback);

// Protect the GET routes
router.use(authMiddleware);
router.get('/', listFeedback);
router.get('/issues', getIssues);
router.get('/stats', getStats);
router.get('/satisfaction-trend', getSatisfactionTrend);

module.exports = router;
