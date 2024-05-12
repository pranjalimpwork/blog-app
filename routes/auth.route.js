const express = require('express');
const { User } = require('../models/'); // Ensure you import User correctly
const bcrypt = require('bcryptjs');
const { hashPassword, generateToken } = require('../utils/auth.helper');
const { ACCESS_TYPE } = require('../constants');

const router = express.Router();

// Register a new user
router.post('/signup', async (req, res) => {
  const { username, email, password, country } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    const hashedPassword = await hashPassword(password);
    const user = new User({ username, email, password: hashedPassword, country, access_type: ACCESS_TYPE.CUSTOMER });
    await user.save();
    delete user.password;
    const token = generateToken({ ...user });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error during signup', error });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // const { username, email, access_type, country } = user;

    delete user.password;

    const token = generateToken({ ...user });
    delete user.password;
    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login', error });
  }
});

module.exports = router;
