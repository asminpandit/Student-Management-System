const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', reportSchema);
