import express from 'express';
import {
  registerPatient,
  loginPatient,
  getProfile
} from '../controllers/patientController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.get('/profile', protect, getProfile);

export default router;
