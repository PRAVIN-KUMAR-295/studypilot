import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbService } from "../services/dbService.js";

const JWT_SECRET = process.env.JWT_SECRET || "studypilot_dev_jwt_secret_key_882910";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Name, email, and password are required"
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Please enter a valid email address"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Password must be at least 6 characters long"
      });
    }

    const existingUser = await dbService.findUserByEmail(trimmedEmail);
    if (existingUser) {
      return res.status(409).json({
        error: "Conflict",
        message: "An account with this email already exists. Please log in."
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await dbService.createUser({
      name: name.trim(),
      email: trimmedEmail,
      passwordHash
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const progress = await dbService.getProgress(newUser.id);

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      },
      progress
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Email and password are required"
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await dbService.findUserByEmail(trimmedEmail);

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const progress = await dbService.getProgress(user.id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      progress
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const progress = await dbService.getProgress(req.user.id);
    return res.status(200).json({
      user: req.user,
      progress
    });
  } catch (error) {
    next(error);
  }
};
