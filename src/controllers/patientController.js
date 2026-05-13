import Patient from '../models/Patient.js';
import generateToken from '../utils/generateToken.js';

/**
 * REGISTER PATIENT
 * ----------------
 * Creates a new patient account.
 * Steps:
 * 1. Extract name, email, password from request body
 * 2. Check if email already exists
 * 3. Create patient (password is hashed by Patient model pre-save hook)
 * 4. Return JWT token + basic patient info
 */
export const registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const patientExists = await Patient.findOne({ email });
    if (patientExists) {
      return res.status(400).json({ message: 'Patient already exists' });
    }

    // Create new patient
    const patient = await Patient.create({ name, email, password });

    // Respond with token + patient info
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

/**
 * LOGIN PATIENT
 * -------------
 * Authenticates a patient using email + password.
 * Steps:
 * 1. Find patient by email
 * 2. Compare password using matchPassword() method
 * 3. Return JWT token + basic patient info
 */
export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password with hashed password in DB
    const isMatch = await patient.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Successful login → return token + patient info
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
