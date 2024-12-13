const Report = require('../Model/reportModel');

// Create a report
const createReport = async (req, res) => {
  const { title, data } = req.body;

  try {
    const newReport = new Report({ title, data });
    const savedReport = await newReport.save();
    res.status(201).json({ message: 'Report created successfully', report: savedReport });
  } catch (err) {
    res.status(500).json({ message: 'Error creating report', error: err.message });
  }
};

// Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports', error: err.message });
  }
};

module.exports = {
  createReport,
  getReports,
};
