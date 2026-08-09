const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  listBusinesses,
  getCurrentBusiness,
  updateCurrentBusiness,
} = require('../controllers/businessController');

const router = express.Router();

router.use(authMiddleware);
router.get('/', listBusinesses);
router.get('/current', getCurrentBusiness);
router.patch('/current', updateCurrentBusiness);

module.exports = router;
