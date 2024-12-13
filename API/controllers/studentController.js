const Student = require('../Model/studentModel');

// Create a new student
const createStudent = async (req, res) => {
  const { name, studentId, age, class: studentClass, address, contactInfo } = req.body;

  try {
    const newStudent = new Student({ name, studentId, age, class: studentClass, address, contactInfo });
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', student: savedStudent });
  } catch (err) {
    res.status(500).json({ message: 'Error creating student', error: err.message });
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student', error: err.message });
  }
};

// Update student details
const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: 'Error updating student', error: err.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
