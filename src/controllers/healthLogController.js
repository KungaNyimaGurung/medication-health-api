import HealthLog from '../models/HealthLog.js';

/**
 * CREATE HEALTH LOG
 * -----------------
 * Creates a new health log for the authenticated patient.
 * The `patient` field is automatically attached from req.user.id
 * to ensure logs are always linked to the correct user.
 */
export const createHealthLog = async (req, res) => {
  try {
    const log = await HealthLog.create({
      ...req.body,        // symptoms, mood, painLevel, notes
      patient: req.user.id // logged-in patient ID
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL HEALTH LOGS
 * -------------------
 * Returns all logs belonging to the authenticated patient.
 * Ensures patients can only see their own logs.
 */
export const getHealthLogs = async (req, res) => {
  try {
    const logs = await HealthLog.find({ patient: req.user.id });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET SINGLE HEALTH LOG
 * ---------------------
 * Fetches one specific health log by ID.
 * Ensures the log belongs to the authenticated patient.
 */
export const getHealthLogById = async (req, res) => {
  try {
    const log = await HealthLog.findOne({
      _id: req.params.id,
      patient: req.user.id
    });

    if (!log) {
      return res.status(404).json({ message: "Health log not found" });
    }

    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE HEALTH LOG
 * -----------------
 * Updates a health log only if it belongs to the authenticated patient.
 * Returns the updated log.
 */
export const updateHealthLog = async (req, res) => {
  try {
    const log = await HealthLog.findOneAndUpdate(
      { _id: req.params.id, patient: req.user.id }, // ensure ownership
      req.body,                                     // updated fields
      { new: true }                                 // return updated document
    );

    if (!log) {
      return res.status(404).json({ message: "Health log not found" });
    }

    res.json({
      message: "Health log updated successfully",
      log
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE HEALTH LOG
 * -----------------
 * Deletes a health log only if it belongs to the authenticated patient.
 */
export const deleteHealthLog = async (req, res) => {
  try {
    const log = await HealthLog.findOneAndDelete({
      _id: req.params.id,
      patient: req.user.id
    });

    if (!log) {
      return res.status(404).json({ message: "Health log not found" });
    }

    res.json({ message: "Health log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
