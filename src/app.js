import express from 'express';
import dotenv from 'dotenv';
import patientRoutes from './routes/patientRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Medication & Health API is running' });
});

// Patient authentication routes
app.use('/api/patients', patientRoutes);

export default app;
