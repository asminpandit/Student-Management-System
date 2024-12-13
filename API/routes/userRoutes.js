const express = require('express');
const {
  registerUser,
  loginUser,
  getUserById,
} = require('../controllers/userController'); // Import the controllers

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to get user details by ID
router.get('/:id', getUserById);

module.exports = router;
