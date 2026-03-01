const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper: create a JWT token for a user
const createToken = (userId) => {
  return jwt.sign(
    { id: userId },           // Payload — what we store in token
    process.env.JWT_SECRET,   // Secret key to sign it
    { expiresIn: '7d' }       // Token expires in 7 days
  );
};

// ─────────────────────────────────────────────
// SIGNUP
// ─────────────────────────────────────────────
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check all fields provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password — never store plain text
    // 10 = salt rounds (how complex the hash is)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Create token
    const token = createToken(user._id);

    // Send back token + user info (no password!)
    res.status(201).json({
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create token
    const token = createToken(user._id);

    res.status(200).json({
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { signup, login };