import React, { useEffect, useState } from 'react';
import API from '../utils/api'; // Axios instance
import '../Styles/Styles.css';


const StudentList = () => {
  const [students, setStudents] = useState([]); // State for student data

  // Fetch student data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await API.get('/'); // Call backend API
        setStudents(response.data); // Update state with student data
      } catch (err) {
        console.error("Error fetching students:", err.message);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Age</th>
            <th>address</th>
            <th>contactInfo</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.age}</td>
              <td>{student.address}</td>
              <td>{student.contactInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
