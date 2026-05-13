import express from 'express';
import {
  registerPatient,
  loginPatient,
} from '../controllers/patientController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * POST /api/patients/register
 * ---------------------------
 * Register a new patient account.
 * Public route — no authentication required.
 * Controller: registerPatient
 */
router.post('/register', registerPatient);

/**
 * POST /api/patients/login
 * ------------------------
 * Authenticate a patient and return a JWT token.
 * Public route — no authentication required.
 * Controller: loginPatient
 */
router.post('/login', loginPatient);

/**
 * GET /api/patients/profile
 * -------------------------
 * Protected route — requires valid JWT.
 * Used to verify token or fetch patient profile data.
 * Currently only runs the protect middleware.
 * (You can attach a controller later if you want to return profile info.)
 */
router.get('/profile', protect);

export default router;
