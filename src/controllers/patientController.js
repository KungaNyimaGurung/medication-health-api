import Patient from '../models/Patient.js';
import generateToken from '../utils/generateToken.js';

// Register
export const registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Patient.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const patient = await Patient.create({ name, email, password });

    res.status(201).json({
      message: 'Patient registered successfully',
      token: generateToken(patient._id),
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await patient.matchPassword(password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    res.json({
      message: 'Login successful',
      token: generateToken(patient._id),
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get profile
export const getProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select('-password');
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
