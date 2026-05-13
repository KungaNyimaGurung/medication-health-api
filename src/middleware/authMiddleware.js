import jwt from 'jsonwebtoken';
import Patient from '../models/Patient.js';

/**
 * protect Middleware
 * ------------------
 * Secures routes by requiring a valid JWT token.
 * - Extracts token from Authorization header
 * - Verifies token using JWT_SECRET
 * - Decodes patient ID from token
 * - Fetches patient from DB (without password)
 * - Attaches patient to req.user
 * - Allows request to continue
 */
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      // Extract token from header: "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify token and decode payload (contains patient ID)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch patient from DB and attach to req.user
      // Exclude password for security
      req.user = await Patient.findById(decoded.id).select('-password');

      return next(); // Continue to the protected route
    } catch (error) {
      // Token exists but is invalid or expired
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // No token provided at all
  res.status(401).json({ message: 'Not authorized, no token' });
};

export default protect;
