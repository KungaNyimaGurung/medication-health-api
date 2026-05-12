import HealthLog from '../models/HealthLog.js';

// CREATE
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

// GET ALL
export const getHealthLogs = async (req, res) => {
  try {
    const logs = await HealthLog.find({ patient: req.user.id });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
export const getHealthLogById = async (req, res) => {
  try {
    const log = await HealthLog.findOne({
      _id: req.params.id,
      patient: req.user.id
    });

    if (!log) return res.status(404).json({ message: "Health log not found" });

    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateHealthLog = async (req, res) => {
  try {
    const log = await HealthLog.findOneAndUpdate(
      { _id: req.params.id, patient: req.user.id },
      req.body,
      { new: true }
    );

    if (!log) return res.status(404).json({ message: "Health log not found" });

    res.json({
      message: "Health log updated successfully",
      log
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteHealthLog = async (req, res) => {
  try {
    const log = await HealthLog.findOneAndDelete({
      _id: req.params.id,
      patient: req.user.id
    });

    if (!log) return res.status(404).json({ message: "Health log not found" });

    res.json({ message: "Health log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
