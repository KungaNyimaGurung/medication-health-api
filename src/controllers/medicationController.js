import Medication from '../models/Medication.js';

/**
 * CREATE MEDICATION
 * -----------------
 * Creates a new medication entry for the authenticated patient.
 * The `patient` field is automatically attached from req.user.id.
 */
export const createMedication = async (req, res) => {
  try {
    const medication = await Medication.create({
      ...req.body,        // name, dosage, frequency, times, dates, notes
      patient: req.user.id
    });

    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL MEDICATIONS
 * -------------------
 * Returns all medications belonging to the authenticated patient.
 * Ensures patients only see their own prescriptions.
 */
export const getMedications = async (req, res) => {
  try {
    const meds = await Medication.find({ patient: req.user.id });
    res.json(meds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE MEDICATION
 * -----------------
 * Updates a medication ONLY if it belongs to the authenticated patient.
 * Uses findOneAndUpdate to enforce ownership.
 */
export const updateMedication = async (req, res) => {
  try {
    const med = await Medication.findOneAndUpdate(
      { _id: req.params.id, patient: req.user.id }, // ownership check
      req.body,
      { new: true }
    );

    if (!med) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json({
      message: "Medication updated successfully",
      med
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE MEDICATION
 * -----------------
 * Deletes a medication ONLY if it belongs to the authenticated patient.
 */
export const deleteMedication = async (req, res) => {
  try {
    const med = await Medication.findOneAndDelete({
      _id: req.params.id,
      patient: req.user.id
    });

    if (!med) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json({ message: "Medication deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
