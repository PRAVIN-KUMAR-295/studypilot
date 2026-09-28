import jwt from "jsonwebtoken";
import { dbService } from "../services/dbService.js";

const JWT_SECRET = process.env.JWT_SECRET || "studypilot_dev_jwt_secret_key_882910";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Authentication token missing or invalid format"
      });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid or expired session token"
      });
    }

    const user = await dbService.findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User account no longer exists"
      });
    }

    // Attach user to request object (excluding passwordHash)
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    next();
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to authenticate request"
    });
  }
};
