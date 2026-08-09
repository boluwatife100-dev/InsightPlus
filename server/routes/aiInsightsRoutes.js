const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getInsights } = require('../controllers/aiInsightsController');

const router = express.Router();

router.use(authMiddleware);
router.get('/', getInsights);

module.exports = router;
