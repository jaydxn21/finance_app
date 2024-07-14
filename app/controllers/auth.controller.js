const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findAll();
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    console.log(user);
    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
