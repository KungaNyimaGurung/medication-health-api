import express from 'express';
import {
  createHealthLog,
  getHealthLogs
} from '../controllers/healthLogController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createHealthLog);
router.get('/', protect, getHealthLogs);

export default router;
