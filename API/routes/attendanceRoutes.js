const express = require('express');
const {
  recordAttendance,
  getAttendances,
} = require('../controllers/attendanceController');

const router = express.Router();

router.post('/', recordAttendance);
router.get('/', getAttendances);

module.exports = router;
