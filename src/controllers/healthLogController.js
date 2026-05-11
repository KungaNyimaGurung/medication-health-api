import HealthLog from '../models/HealthLog.js';

export const createHealthLog = async (req, res) => {
  try {
    const log = await HealthLog.create({
      ...req.body,
      patient: req.user.id
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHealthLogs = async (req, res) => {
  try {
    const logs = await HealthLog.find({ patient: req.user.id });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
