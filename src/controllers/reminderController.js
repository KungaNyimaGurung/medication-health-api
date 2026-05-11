import Reminder from '../models/Reminder.js';
import dayjs from 'dayjs';

/* ---------------------------------------------------------
   CREATE REMINDER (manual)
--------------------------------------------------------- */
export const createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create({
      ...req.body,
      patient: req.user.id
    });

    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------------------------------------------------
   GET ALL REMINDERS FOR LOGGED-IN PATIENT
--------------------------------------------------------- */
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ patient: req.user.id });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------------------------------------------------
   UPDATE REMINDER STATUS (sent, missed, pending)
--------------------------------------------------------- */
export const updateReminderStatus = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------------------------------------------------
   STEP 4: UPCOMING REMINDERS (Next 24 Hours)
--------------------------------------------------------- */
export const getUpcomingReminders = async (req, res) => {
  try {
    const now = dayjs();
    const next24 = now.add(24, 'hour');

    const reminders = await Reminder.find({
      patient: req.user.id,
      time: { $gte: now.toDate(), $lte: next24.toDate() }
    })
      .populate('medication', 'name dosage')
      .sort({ time: 1 });

    res.status(200).json({
      count: reminders.length,
      reminders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
