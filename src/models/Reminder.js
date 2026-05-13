import mongoose from 'mongoose';

/**
 * Reminder Schema
 * ---------------
 * Stores auto‑generated or manually created reminders for medications.
 * Each reminder belongs to a patient and a specific medication,
 * and tracks the scheduled time and delivery status.
 */
const reminderSchema = new mongoose.Schema(
  {
    /**
     * patient
     * -------
     * References the Patient collection.
     * Identifies which patient this reminder belongs to.
     * Required: Yes
     */
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },

    /**
     * medication
     * ----------
     * References the Medication collection.
     * Links the reminder to the medication it is for.
     * Required: Yes
     */
    medication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medication',
      required: true
    },

    /**
     * time
     * ----
     * The exact date and time when the reminder should trigger.
     * Example: 2025-05-10T09:00:00.000Z
     * Required: Yes
     */
    time: {
      type: Date,
      required: true
    },

    /**
     * status
     * ------
     * Tracks the state of the reminder.
     *
     * Values:
     * - pending → reminder created but not yet sent
     * - sent → email/SMS notification delivered
     * - missed → time passed without sending
     *
     * Default: pending
     */
    status: {
      type: String,
      enum: ['pending', 'sent', 'missed'],
      default: 'pending'
    }
  },

  /**
   * timestamps
   * ----------
   * Automatically adds:
   * - createdAt
   * - updatedAt
   * Useful for tracking reminder history and debugging.
   */
  { timestamps: true }
);

// Export the model for use in cron jobs, controllers, and routes
export default mongoose.model('Reminder', reminderSchema);
