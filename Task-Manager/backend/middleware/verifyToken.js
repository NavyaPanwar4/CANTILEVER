import jwt from "jsonwebtoken";
import config from "../config/config.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
