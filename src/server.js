import app from './app.js';
import connectDB from './config/db.js';
import './jobs/reminderJob.js';   // Auto-reminder system enabled

// Server port (fallback to 4000 if not provided)
const PORT = process.env.PORT || 4000;

/**
 * CONNECT TO MONGODB
 * ------------------
 * Establishes a connection to your MongoDB database.
 * If connection fails, the app will not start.
 */
connectDB();

/**
 * START EXPRESS SERVER
 * --------------------
 * Begins listening for incoming API requests.
 * Also ensures the cron jobs (imported above) run in the background.
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
