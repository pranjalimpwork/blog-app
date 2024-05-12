const express = require('express');
const { User } = require('../models/'); // Ensure you import User correctly
const bcrypt = require('bcryptjs');
const { authMiddleware } = require('../utils/auth.helper'); // Authentication middleware

const router = express.Router();

// Get all users (requires authentication)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Error getting users', error });
  }
});

// Get a single user by ID (requires authentication)
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Error getting user by ID', error });
  }
});

// Update a user by ID (requires authentication)
router.patch('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { username, email, password, country } = req.body;

  try {
    const updateData = { username, email, country };

    // Hash the new password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete a user by ID (requires authentication)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// Get all users (requires authentication)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Return the list of users in JSON format
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Error getting users', error });
  }
});

module.exports = router;
