import Medication from '../models/Medication.js';

export const createMedication = async (req, res) => {
  try {
    const medication = await Medication.create({
      ...req.body,
      patient: req.user.id
    });

    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedications = async (req, res) => {
  try {
    const meds = await Medication.find({ patient: req.user.id });
    res.json(meds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMedication = async (req, res) => {
  try {
    const med = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(med);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMedication = async (req, res) => {
  try {
    await Medication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medication deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
