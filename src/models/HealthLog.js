import mongoose from 'mongoose';

/**
 * HealthLog Schema
 * ----------------
 * Stores daily health-related entries for each patient.
 * Each log is tied to a specific patient and contains
 * optional details like symptoms, mood, pain level, and notes.
 */
const healthLogSchema = new mongoose.Schema(
  {
    /**
     * patient
     * -------
     * References the Patient collection.
     * This creates a relationship: each health log belongs to one patient.
     * Required: Yes
     */
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },

    /**
     * symptoms
     * --------
     * A short description of what symptoms the patient is experiencing.
     * Example: "Headache, nausea, coughing"
     */
    symptoms: {
      type: String
    },

    /**
     * mood
     * ----
     * Describes the patient's emotional state.
     * Example: "Happy", "Stressed", "Anxious"
     */
    mood: {
      type: String
    },

    /**
     * painLevel
     * ---------
     * Numeric scale from 0 to 10.
     * 0 = No pain
     * 10 = Worst possible pain
     * Mongoose validates the range automatically.
     */
    painLevel: {
      type: Number,
      min: 0,
      max: 10
    },

    /**
     * notes
     * -----
     * Additional free‑text notes about the patient's condition.
     * Example: "Pain increases after walking. Took medication at 3 PM."
     */
    notes: {
      type: String
    }
  },

  /**
   * timestamps
   * ----------
   * Automatically adds:
   * - createdAt: Date when the log was created
   * - updatedAt: Date when the log was last modified
   */
  { timestamps: true }
);

// Export the model so it can be used in controllers and routes
export default mongoose.model('HealthLog', healthLogSchema);
