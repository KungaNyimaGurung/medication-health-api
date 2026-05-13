import mongoose from 'mongoose';

/**
 * Medication Schema
 * -----------------
 * Stores medication details for each patient.
 * Each medication entry includes dosage, schedule, duration,
 * and optional notes. A patient can have multiple medications.
 */
const medicationSchema = new mongoose.Schema(
    {
        /**
         * patient
         * -------
         * References the Patient collection.
         * This links each medication to the patient who owns it.
         * Required: Yes
         */
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },

        /**
         * name
         * ----
         * The name of the medication.
         * Example: "Amoxicillin", "Paracetamol"
         * Required: Yes
         */
        name: {
            type: String,
            required: true
        },

        /**
         * dosage
         * ------
         * The strength or amount of the medication.
         * Example: "500mg", "10ml", "1 tablet"
         * Required: Yes
         */
        dosage: {
            type: String,
            required: true
        },

        /**
         * frequency
         * ---------
         * How many times per day the medication should be taken.
         * Example: 2 (twice a day), 3 (three times a day)
         * Required: Yes
         */
        frequency: {
            type: Number,
            required: true
        },

        /**
         * times
         * -----
         * Specific times of day the medication should be taken.
         * Example: ["09:00", "21:00"]
         * Required: Yes
         */
        times: [
            {
                type: String,
                required: true
            }
        ],

        /**
         * startDate
         * ---------
         * When the medication course begins.
         * Required: Yes
         */
        startDate: {
            type: Date,
            required: true
        },

        /**
         * endDate
         * -------
         * When the medication course ends.
         * Optional — some medications may be ongoing.
         */
        endDate: {
            type: Date
        },

        /**
         * notes
         * -----
         * Additional instructions or comments.
         * Example: "Take after meals", "Avoid dairy"
         * Optional
         */
        notes: {
            type: String
        }
    },

    /**
     * timestamps
     * ----------
     * Automatically adds:
     * - createdAt
     * - updatedAt
     * Useful for tracking medication history.
     */
    { timestamps: true }
);

// Export the model for use in controllers and routes
export default mongoose.model('Medication', medicationSchema);
