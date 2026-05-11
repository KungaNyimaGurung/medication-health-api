import mongoose from 'mongoose';

const healthLogSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    symptoms: { type: String },
    mood: { type: String },
    painLevel: { type: Number, min: 0, max: 10 },
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('HealthLog', healthLogSchema);
