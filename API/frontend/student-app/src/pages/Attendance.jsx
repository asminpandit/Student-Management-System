import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("");  // Added status field
  const [students, setStudents] = useState([]);  // To fetch and list students

  // Fetch attendance records and students when the component mounts
  useEffect(() => {
    fetchAttendance();
    fetchStudents();  // Added function to fetch students
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:5501/api/attendances');
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance records:", error.message);
    }
  };

  // Fetch students for dropdown selection
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5501/api/students');  // Assuming student API exists
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  const handleAddAttendance = async () => {
    if (!studentId || !status) {
      alert('Please provide both student ID and status.');
      return;
    }

    try {
      const recordAttendance = { studentId, status };  // Send studentId and status to the backend
      await axios.post('http://localhost:5501/api/attendances', recordAttendance);
      fetchAttendance();  // Fetch updated records
      setStudentId("");  // Reset the input fields
      setStatus("");     // Reset the status field
    } catch (error) {
      console.error("Error adding attendance:", error.message);
      alert("Failed to add attendance!");
    }
  };

  return (
    <div>
      <h2>Attendance</h2>
      <div>
        {/* Dropdown to select student */}
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
        
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}  // Handle status change
        >
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>

        <button onClick={handleAddAttendance}>Add Attendance</button>
      </div>

      {/* List attendance records */}
      <ul>
        {attendanceRecords.length === 0 ? (
          <p>No attendance records available</p>
        ) : (
          attendanceRecords.map((record) => (
            <li key={record._id}>
              {/* Check if studentId exists and is populated */}
              Student: {record.studentId ? record.studentId.name : "Unknown"} - Status: {record.status} - Date: {new Date(record.date).toLocaleDateString()}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Attendance;
