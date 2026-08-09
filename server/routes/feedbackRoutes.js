const express = require('express');
const validateFeedback = require('../middleware/validateFeedback');
const {
  createFeedback,
  listFeedback,
  getIssues,
  getStats,
  getSatisfactionTrend,
} = require('../controllers/feedbackController');

const router = express.Router();

router.get('/', listFeedback);
router.post('/', validateFeedback, createFeedback);
router.get('/issues', getIssues);
router.get('/stats', getStats);
router.get('/satisfaction-trend', getSatisfactionTrend);

module.exports = router;
