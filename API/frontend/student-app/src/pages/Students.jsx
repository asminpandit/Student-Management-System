import React, { useEffect, useState } from "react";
import { addStudent, deleteStudent } from "../services/api"; // Removed updateStudent and editStudent
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [age, setAge] = useState("");
  const [className, setClassName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  
  // Fetch students from the API
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch students
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5501/api/students'); // Using the getStudents function from API
      setStudents(response.data); // Set students data
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  // Function to add a new student
  const handleAddStudent = async () => {
    try {
      const newStudent = {
        name,
        studentId,
        age,
        class: className,
        address,
        contactInfo,
      };
      await axios.post('http://localhost:5501/api/students', newStudent); // Correct API endpoint
      fetchStudents(); // Fetch students after adding
      resetForm();
    } catch (error) {
      console.error("Error adding student:", error.message);
      alert("Failed to add student!");
    }
  };

  // Function to delete a student
  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id); // Using the deleteStudent function
      fetchStudents(); // Fetch students after deleting
    } catch (error) {
      alert("Failed to delete student!");
    }
  };

  // Function to reset the form
  const resetForm = () => {
    setName("");
    setStudentId("");
    setAge("");
    setClassName("");
    setAddress("");
    setContactInfo("");
  };

  return (
    <div>
      <h2>Students</h2>

      {/* Add Student Form */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <button onClick={handleAddStudent}>Add Student</button>
      </div>

      {/* Student List Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Age</th>
            <th>Class</th>
            <th>Address</th>
            <th>Contact Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.studentId}</td>
              <td>{student.age}</td>
              <td>{student.class}</td>
              <td>{student.address}</td>
              <td>{student.contactInfo}</td>
              <td>
                <button onClick={() => handleDeleteStudent(student._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
