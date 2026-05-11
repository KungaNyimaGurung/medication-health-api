import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        name: { type: String, required: true },
        dosage: { type: String, required: true }, // e.g., "500mg"
        frequency: { type: Number, required: true }, // times per day
        times: [{ type: String, required: true }], // e.g., ["09:00", "21:00"]
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        notes: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model('Medication', medicationSchema);
