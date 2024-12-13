const Attendance = require('../Model/attendanceModel');

// Record new attendance
const recordAttendance = async (req, res) => {
  const { studentId, status } = req.body;

  try {
    const newAttendance = new Attendance({ studentId, status });
    const savedAttendance = await newAttendance.save();
    res.status(201).json({ message: 'Attendance recorded successfully', attendance: savedAttendance });
  } catch (err) {
    res.status(500).json({ message: 'Error recording attendance', error: err.message });
  }
};

// Get all attendance records
const getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find().populate('studentId');
    res.status(200).json(attendances);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance records', error: err.message });
  }
};

module.exports = {
  recordAttendance,
  getAttendances,
};
