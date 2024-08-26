const express = require('express');
const Car = require('../models/caruser');
const bcrypt = require('bcrypt');

const router = express.Router();

// GET: Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await Car.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Register a new user
router.post('/', async (req, res) => {
  const { username, email, age, gender, dob, city, profession, password } = req.body;
  const salt = await bcrypt.genSalt(10);
    let encryptedPass = await bcrypt.hash(req.body.password, salt);

  try {
    let user = new Car({
      username,
      email,
      age,
      gender,
      dob,
      city,
      profession,
      password: encryptedPass,
    });
    
    user = await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update a user's data
router.put('/:id', async (req, res) => {
  try {
    const user = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Partially update a user
router.patch('/:id', async (req, res) => {
  try {
    const user = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove a user
router.delete('/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
