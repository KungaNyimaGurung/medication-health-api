import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Patient Schema
 * --------------
 * Stores user (patient) account information.
 * Includes authentication fields like email and password,
 * optional phone number, and automatic timestamps.
 */
const patientSchema = new mongoose.Schema(
  {
    /**
     * name
     * ----
     * Full name of the patient.
     * Required for identification.
     */
    name: {
      type: String,
      required: true,
      trim: true, // removes leading/trailing spaces
    },

    /**
     * email
     * -----
     * Unique login identifier for the patient.
     * Stored in lowercase to avoid duplicates like:
     * "TEST@GMAIL.COM" vs "test@gmail.com"
     */
    email: {
      type: String,
      required: true,
      unique: true, // ensures no two patients share the same email
      lowercase: true,
    },

    /**
     * phone
     * -----
     * Optional phone number.
     * Useful for SMS reminders or contact info.
     */
    phone: {
      type: String,
      required: false,
      trim: true,
    },

    /**
     * password
     * --------
     * Hashed password (never stored in plain text).
     * Minimum length ensures basic security.
     */
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },

  /**
   * timestamps
   * ----------
   * Automatically adds:
   * - createdAt
   * - updatedAt
   * Useful for account creation tracking and auditing.
   */
  { timestamps: true }
);

/**
 * Pre-save Hook
 * -------------
 * Runs before saving a patient document.
 * If the password field is modified, hash it using bcrypt.
 * Prevents double-hashing when updating other fields.
 */
patientSchema.pre('save', async function (next) {
  // If password is unchanged, skip hashing
  if (!this.isModified('password')) return next();

  // Hash password with salt rounds = 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * matchPassword Method
 * --------------------
 * Compares a plain-text password with the hashed password stored in DB.
 * Used during login authentication.
 *
 * @param {string} enteredPassword - password provided by the user
 * @returns {boolean} true if passwords match
 */
patientSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Export model for use in controllers and routes
export default mongoose.model('Patient', patientSchema);
