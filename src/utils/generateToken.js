import jwt from 'jsonwebtoken';

/**
 * generateToken
 * -------------
 * Creates a signed JWT token for authentication.
 *
 * @param {string} patientId - The MongoDB _id of the patient
 * @returns {string} A signed JWT token valid for 30 days
 *
 * How it works:
 * - The token payload contains: { id: patientId }
 * - It is signed using JWT_SECRET from your .env file
 * - The token expires in 30 days
 *
 * Used in:
 * - registerPatient (after creating account)
 * - loginPatient (after verifying credentials)
 */
const generateToken = (patientId) => {
  return jwt.sign(
    { id: patientId },            // payload
    process.env.JWT_SECRET,       // secret key
    { expiresIn: '30d' }          // token validity
  );
};

export default generateToken;
