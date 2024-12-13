import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [teacher, setTeacher] = useState("");
  const [schedule, setSchedule] = useState("");

  // Fetch courses from the database when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Function to fetch courses from the API
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5501/api/courses');
      setCourses(response.data); // Set courses data
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  // Function to handle adding a new course
  const handleAddCourse = async () => {
    try {
      const newCourse = {
        courseName,
        courseCode,
        teacher,
        schedule
      };
      await axios.post('http://localhost:5501/api/courses', newCourse); // Correct API endpoint for adding courses
      fetchCourses(); // Fetch updated course list after adding
      resetForm(); // Reset form after adding
    } catch (error) {
      console.error("Error adding course:", error.message);
      alert("Failed to add course!");
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setCourseName("");
    setCourseCode("");
    setTeacher("");
    setSchedule("");
  };

  return (
    <div>
      <h2>Courses</h2>

      {/* Add Course Form */}
      <div>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teacher"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
        />
        <input
          type="text"
          placeholder="Schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      {/* Table to Display Courses */}
      <div>
        {courses.length === 0 ? (
          <p>No courses available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Teacher</th>
                <th>Schedule</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.courseName}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.teacher}</td>
                  <td>{course.schedule || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Courses;
