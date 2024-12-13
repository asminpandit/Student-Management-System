import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetching students, attendances, and courses
    const fetchStudents = async () => {
      const response = await axios.get('http://localhost:5501/api/students');
      setStudents(response.data);
    };

    const fetchAttendances = async () => {
      const response = await axios.get('http://localhost:5501/api/attendances');
      setAttendances(response.data);
    };

    const fetchCourses = async () => {
      const response = await axios.get('http://localhost:5501/api/courses');
      setCourses(response.data);
    };

    fetchStudents();
    fetchAttendances();
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Student Report</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            // For each student, get their courses and attendance
            const studentAttendance = attendances.filter(
              (attendance) => attendance.studentId === student._id
            );

            // Get the student's courses by matching course IDs with the courses array
            const studentCourses = courses.filter((course) =>
              student.courses.includes(course._id)
            );

            return studentCourses.map((course) => {
              // For each course, match the attendance based on course ID and student ID
              const attendanceForCourse = studentAttendance.filter(
                (attendance) => attendance.course === course._id
              );

              return (
                <tr key={`${student._id}-${course._id}`}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{course.courseName}</td>
                  <td>
                    {attendanceForCourse.length > 0
                      ? attendanceForCourse.map((attendance) => (
                          <span key={attendance._id}>{attendance.status}</span>
                        ))
                      : 'No attendance data'}
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
