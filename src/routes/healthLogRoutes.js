import express from 'express';
import {
  createHealthLog,
  getHealthLogs,
  getHealthLogById,
  updateHealthLog,
  deleteHealthLog
} from '../controllers/healthLogController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Create
router.post('/', protect, createHealthLog);

// Get all logs
router.get('/', protect, getHealthLogs);

// Get single log
router.get('/:id', protect, getHealthLogById);

// Update log
router.put('/:id', protect, updateHealthLog);

// Delete log
router.delete('/:id', protect, deleteHealthLog);

export default router;
