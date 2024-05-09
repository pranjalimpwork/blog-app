const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send('Error getting users');
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).send('Error getting user by ID');
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
});

module.exports = router;
