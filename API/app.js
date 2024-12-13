const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const feeRoutes = require('./routes/feeRoutes');
const reportRoutes = require('./routes/reportRoutes');
const user_Routes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', user_Routes)
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5501;
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server error:', error.message);
  }
};

start();














// app.get("/", (req, res) => {
//     res.send("Hi, I am live");
// });