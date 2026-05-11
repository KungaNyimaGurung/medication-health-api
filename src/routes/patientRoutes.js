import express from 'express';
import {
  registerPatient,
  loginPatient,
} from '../controllers/patientController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.get('/profile', protect);

export default router;
