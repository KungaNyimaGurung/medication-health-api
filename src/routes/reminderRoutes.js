import express from 'express';
import {
  createReminder,
  getReminders,
  updateReminderStatus,
  getUpcomingReminders
} from '../controllers/reminderController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Create reminder manually
router.post('/', protect, createReminder);

// Get all reminders for logged-in patient
router.get('/', protect, getReminders);

// Update reminder status (pending → sent → missed)
router.put('/:id', protect, updateReminderStatus);

// ⭐ Step 4: Get upcoming reminders (next 24 hours)
router.get('/upcoming', protect, getUpcomingReminders);

export default router;
