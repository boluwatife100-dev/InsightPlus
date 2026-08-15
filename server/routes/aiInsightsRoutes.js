const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getInsights, generateInsights } = require('../controllers/aiInsightsController');

const router = express.Router();

router.use(authMiddleware);
router.get('/', getInsights);
router.post('/generate', generateInsights);

module.exports = router;
