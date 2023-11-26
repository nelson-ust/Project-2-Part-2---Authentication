const express = require("express");
const User = require("../models/user"); // Assuming you have a User model

const router = express.Router();

// Check authentication status
router.get("/check-auth", (req, res) => {
  if (req.user) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false, user: null });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const newUser = new User({ username: req.body.username });
    await User.register(newUser, req.body.password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
    if (!user) {
      // Authentication failed
      return res.status(401).json({ authenticated: false, user: null });
    }

    // If authentication succeeded, log in the user
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return res.status(500).json({ error: 'Internal Server Error', details: loginErr.message });
      }

      // Authentication successful
      res.status(200).json({ authenticated: true, user: req.user });
    });
  })(req, res, next);
});


// Logout route
router.get("/logout", (req, res) => {
  req.logout(); // Destroy the user session
  res.json({ message: "Logged out successfully" });
});

// Protected route (example)
router.get("/protected", (req, res) => {
  if (req.user) {
    res.json({ message: "You are authenticated!" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
