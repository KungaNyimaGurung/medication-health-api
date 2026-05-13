/**
 * medicationReminderTemplate
 * --------------------------
 * Generates the HTML email content for medication reminders.
 *
 * @param {string} patientName - The patient's name
 * @param {string} medName - The medication name
 * @param {string} time - The formatted reminder time (e.g., "09:00 AM")
 *
 * @returns {string} HTML email template
 *
 * Used by:
 * - Cron job (auto reminders)
 * - Manual reminder creation (optional)
 */
export const medicationReminderTemplate = (patientName, medName, time) => `
  <div style="font-family: Arial; padding: 20px;">
    <h2>⏰ Medication Reminder</h2>

    <p>Hello <strong>${patientName}</strong>,</p>

    <p>This is a reminder to take your medication:</p>

    <h3>${medName}</h3>
    <p><strong>Time:</strong> ${time}</p>

    <p>Please take it as prescribed.</p>

    <br/>

    <p style="font-size: 12px; color: #777;">
      Medication & Health Assistant
    </p>
  </div>
`;
