import jwt from 'jsonwebtoken';

const generateToken = (patientId) => {
  return jwt.sign({ id: patientId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
