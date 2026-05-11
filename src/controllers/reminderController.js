import Reminder from '../models/Reminder.js';

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

export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ patient: req.user.id });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
