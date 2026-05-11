import Patient from '../models/Patient.js';
import generateToken from '../utils/generateToken.js';

export const registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const patientExists = await Patient.findOne({ email });
    if (patientExists) return res.status(400).json({ message: 'Patient already exists' });

    const patient = await Patient.create({ name, email, password });

    res.status(201).json({
      message: 'Patient registered successfully',
      token: generateToken(patient._id),
      patient: { id: patient._id, name: patient.name, email: patient.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await patient.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      token: generateToken(patient._id),
      patient: { id: patient._id, name: patient.name, email: patient.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
