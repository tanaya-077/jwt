const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../midddleware/authMiddleware");
const Secret = "qwerty1234@#$";

// Register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required" });
    }
  
    try {
      const hashedPass = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPass });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "server error" });
    }
  });
// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "Authentication failed" });
  }
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    return res.status(401).json({ error: "Authentication failed" });
  }
  const token = jwt.sign({ userId: user._id }, Secret, {
    expiresIn: '1h',
  });
  res.status(200).json({ token });
});

// User 
router.get("/user", verifyToken, (req, res) => {
  res.status(200).json({ message: "User route accessed successfully" });
});

// Admin 
router.get("/admin", verifyToken, (req, res) => {
  res.status(200).json({ message: "Admin route accessed successfully" });
});

// Logout 
router.get("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;