const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import JWT library

// Replace with your actual JWT secret (strong, random string)
const jwtSecret = "very_secret_token";

// Register
router.post("/register", async (req, res) => {
  try {
    // Hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    let resolvedRole;

    if (req.body.role !== "user" && req.body.role !== "admin") {
      resolvedRole = "user";
    } else {
      resolvedRole = "admin";
    }
    // Create new user with hashed password
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      role: resolvedRole,
    });

    // Save user to database
    const user = await newUser.save();

    // Create JWT payload with user ID (avoid sensitive data)
    const payload = { userId: user._id, role: user.role };

    // Sign JWT using secret and expiration time
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" }); // Adjust expiration as needed

    // Respond with success and the token (exclude password)
    res.status(200).json({ user: { ...user._doc }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login with JWT authentication
router.post("/login", async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ username: req.body.username });

    // Check if user exists and passwords match
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT payload with user ID
    const payload = { userId: user._id, role: user.role };

    // Sign JWT using secret and expiration time
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" }); // Adjust expiration as needed

    // Respond with success and the token (exclude password)
    res.status(200).json({ user: { ...user._doc }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
