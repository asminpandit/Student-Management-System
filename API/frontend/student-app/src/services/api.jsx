import axios from "axios";

const API_URL = "http://13.203.146.226:5501/api"; // Your backend API base URL

// User Authentication
export const login = (email, password) => axios.post(`${API_URL}/user/login`, { email, password });
export const register = (data) => axios.post(`${API_URL}/user/register`, data);

export const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5501/api/students/${id}`);
    } catch (error) {
      throw new Error('Error deleting student');
    }
  };

export const getStudents = () => axios.get(`${API_URL}/student`);
export const addStudent = (data) => axios.post(`${API_URL}/student`, data);
export const updateStudent = (id, data) => axios.put(`${API_URL}/student/${id}`, data);

// Courses Management
export const getCourses = () => axios.get(`${API_URL}/course`);
export const addCourse = (data) => axios.post(`${API_URL}/course`, data);

// Attendance Management
export const recordAttendance = async (attendanceData) => {
    try {
      await axios.post('http://localhost:5501/api/attendances', attendanceData);  // POST request with studentId and status
    } catch (error) {
      throw new Error('Failed to add attendance');
    }
  };
export const getAttendance = () => axios.get(`${API_URL}/attendance`);


// Fee Management
export const getFees = () => axios.get(`${API_URL}/fees`);
export const addFee = (data) => axios.post(`${API_URL}/fees`, data);

// Reports and Analytics
export const getReports = () => axios.get(`${API_URL}/reports`);
