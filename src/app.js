import express from 'express';
import dotenv from 'dotenv';

import patientRoutes from './routes/patientRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import healthLogRoutes from './routes/healthLogRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Medication & Health API is running' });
});

// Patient authentication routes
app.use('/api/patients', patientRoutes);

// Medication routes
app.use('/api/medications', medicationRoutes);

// Health log routes
app.use('/api/healthlogs', healthLogRoutes);

// Reminder routes
app.use('/api/reminders', reminderRoutes);

export default app;
