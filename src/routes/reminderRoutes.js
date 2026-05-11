import express from 'express';
import {
  createReminder,
  getReminders,
  updateReminderStatus
} from '../controllers/reminderController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReminder);
router.get('/', protect, getReminders);
router.put('/:id', protect, updateReminderStatus);

export default router;
