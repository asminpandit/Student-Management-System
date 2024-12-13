const Course = require('../Model/courseModel');

// Create a new course
const createCourse = async (req, res) => {
  const { courseName, courseCode, teacher, schedule } = req.body;

  try {
    const newCourse = new Course({ courseName, courseCode, teacher, schedule });
    const savedCourse = await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: savedCourse });
  } catch (err) {
    res.status(500).json({ message: 'Error creating course', error: err.message });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching course', error: err.message });
  }
};

// Update course details
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: 'Error updating course', error: err.message });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course', error: err.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
