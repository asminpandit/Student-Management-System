import React from 'react';
// import Navbar from '../Common/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div>
        <Link to="/students">
          <button>Students</button>
        </Link>
        <Link to="/attendance">
          <button>Attendance</button>
        </Link>
        <Link to="/courses">
          <button>Courses</button>
        </Link>
        {/* <Link to="/report">
          <button>Report</button>
        </Link> */}
      </div>
    </div>
  );
};

export default Dashboard;
