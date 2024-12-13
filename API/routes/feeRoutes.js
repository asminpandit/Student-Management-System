const express = require('express');
const {
  recordFee,
  getFees,
} = require('../controllers/feeController');

const router = express.Router();

router.post('/', recordFee);
router.get('/', getFees);

module.exports = router;
