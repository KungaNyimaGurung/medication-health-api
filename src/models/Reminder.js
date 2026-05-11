import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    medication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medication',
      required: true
    },
    time: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'sent', 'missed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Reminder', reminderSchema);
