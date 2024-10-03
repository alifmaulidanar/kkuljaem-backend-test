import Joi from "joi";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail, insertUser } from "../repository/user_repository.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Schema for register validation
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Schema for login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Get user data by JWT
router.get("/profile", authMiddleware, async (req, res) => {
  const userEmail = req.user.email;

  try {
    const [user] = await getUserByEmail(userEmail);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Format the created_at date to Indonesian format
    const createdAt = new Date(user[0].created_at);
    const formattedDate = createdAt.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = createdAt.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return res.json({
      id: user[0].id,
      username: user[0].username,
      email: user[0].email,
      created_at: `${formattedDate} pukul ${formattedTime}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Register new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const { error } = registerSchema.validate({ username, email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if user already exists
  try {
    const [existingUser] = await getUserByEmail(email);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into the database
    await insertUser(username, email, hashedPassword);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if user exists
    const [user] = await getUserByEmail(email);

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userData = user[0];
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: userData.id, email: userData.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Return token and user data
    return res.json({
      token,
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
