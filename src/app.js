import express from 'express';
import dotenv from 'dotenv';

// Importing route modules
import patientRoutes from './routes/patientRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import healthLogRoutes from './routes/healthLogRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

/**
 * ROOT ROUTE
 * ----------
 * Simple health check endpoint.
 * Confirms that the API is running.
 */
app.get('/', (req, res) => {
  res.json({ message: 'Medication & Health API is running' });
});

/**
 * PATIENT AUTH ROUTES
 * -------------------
 * Handles:
 * - Registration
 * - Login
 * - Profile access
 */
app.use('/api/patients', patientRoutes);

/**
 * MEDICATION ROUTES
 * -----------------
 * Handles:
 * - Create medication
 * - Get all medications
 * - Update medication
 * - Delete medication
 */
app.use('/api/medications', medicationRoutes);

/**
 * HEALTH LOG ROUTES
 * -----------------
 * Handles:
 * - Create health log
 * - Get all logs
 * - Get single log
 * - Update log
 * - Delete log
 */
app.use('/api/healthlogs', healthLogRoutes);

/**
 * REMINDER ROUTES
 * ---------------
 * Handles:
 * - Manual reminder creation
 * - Get all reminders
 * - Update reminder status
 * - Get upcoming reminders
 */
app.use('/api/reminders', reminderRoutes);

export default app;
