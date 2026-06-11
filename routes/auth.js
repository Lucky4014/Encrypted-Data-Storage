const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// ─── REGISTER ────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Step 1: Check karo user pehle se hai kya
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Step 2: Salt generate karo (10 rounds recommended)
    const salt = await bcrypt.genSalt(10);

    // Step 3: Password hash karo salt ke saath
    const hashedPassword = await bcrypt.hash(password, salt);

    // Step 4: Hashed password DB mein store karo (NEVER plain password)
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ─── LOGIN ───────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Step 1: DB se user dhundo
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Step 2: User ka plain password, DB ke hash se compare karo
    // bcrypt khud internally salt nikaalta hai hash se aur re-hash karke compare karta hai
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful!' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
