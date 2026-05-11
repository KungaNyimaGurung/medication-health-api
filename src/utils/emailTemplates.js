export const medicationReminderTemplate = (patientName, medName, time) => `
  <div style="font-family: Arial; padding: 20px;">
    <h2>⏰ Medication Reminder</h2>
    <p>Hello <strong>${patientName}</strong>,</p>
    <p>This is a reminder to take your medication:</p>

    <h3>${medName}</h3>
    <p><strong>Time:</strong> ${time}</p>

    <p>Please take it as prescribed.</p>
    <br/>
    <p style="font-size: 12px; color: #777;">Medication & Health Assistant</p>
  </div>
`;
