const Fee = require('../Model/feeModel');

// Record a fee payment
const recordFee = async (req, res) => {
  const { studentId, amountPaid, feeType } = req.body;

  try {
    const newFee = new Fee({ studentId, amountPaid, feeType });
    const savedFee = await newFee.save();
    res.status(201).json({ message: 'Fee payment recorded successfully', fee: savedFee });
  } catch (err) {
    res.status(500).json({ message: 'Error recording fee', error: err.message });
  }
};

// Get all fee records
const getFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate('studentId');
    res.status(200).json(fees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching fee records', error: err.message });
  }
};

module.exports = {
  recordFee,
  getFees,
};
