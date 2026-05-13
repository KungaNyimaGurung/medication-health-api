import cron from 'node-cron';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

import Medication from '../models/Medication.js';
import Reminder from '../models/Reminder.js';
import Patient from '../models/Patient.js';

import { sendEmail } from '../utils/sendEmail.js';
import { medicationReminderTemplate } from '../utils/emailTemplates.js';

// Enable timezone support in Day.js
dayjs.extend(utc);
dayjs.extend(timezone);

// Set your timezone (adjust if needed)
const ZONE = 'America/New_York';

/* =========================================================
   JOB 1: AUTO‑CREATE REMINDERS + SEND EMAILS
   Runs every minute
   ---------------------------------------------------------
   What it does:
   - Checks all medications
   - For each medication time (e.g., "09:00")
   - Compares it to the current minute
   - If they match → create a reminder
   - Sends email to the patient
   - Marks reminder as "sent"
========================================================= */
cron.schedule('* * * * *', async () => {
  const now = dayjs().tz(ZONE).startOf('minute');

  // Fetch all medications in the system
  const medications = await Medication.find();

  for (const med of medications) {
    for (const time of med.times) {
      /**
       * Build the reminder time for TODAY using the medication's time.
       * Example:
       *   now = 2026-05-13
       *   time = "09:00"
       *   reminderTime = "2026-05-13 09:00"
       */
      const reminderTime = dayjs(
        `${now.format('YYYY-MM-DD')} ${time}`,
        'YYYY-MM-DD HH:mm'
      )
        .tz(ZONE)
        .startOf('minute');

      // If the current minute matches the medication time → trigger reminder
      if (now.isSame(reminderTime)) {
        // Prevent duplicate reminders
        const exists = await Reminder.findOne({
          medication: med._id,
          time: reminderTime.toDate()
        });

        if (!exists) {
          // Create reminder in DB
          await Reminder.create({
            patient: med.patient,
            medication: med._id,
            time: reminderTime.toDate(),
            status: 'pending'
          });

          console.log(`⏰ Auto-reminder created for ${med.name} at ${time}`);

          // Fetch patient to send email
          const patient = await Patient.findById(med.patient);

          if (patient?.email) {
            // Build email HTML template
            const html = medicationReminderTemplate(
              patient.name,
              med.name,
              reminderTime.format('hh:mm A')
            );

            // Send email
            const sent = await sendEmail(
              patient.email,
              `Medication Reminder: ${med.name}`,
              html
            );

            // If email sent successfully → mark reminder as "sent"
            if (sent) {
              await Reminder.findOneAndUpdate(
                { medication: med._id, time: reminderTime.toDate() },
                { status: 'sent' }
              );

              console.log(`📨 Email reminder SENT for ${med.name}`);
            }
          }
        }
      }
    }
  }
});

/* =========================================================
   JOB 2: AUTO‑MARK MISSED REMINDERS
   Runs every minute
   ---------------------------------------------------------
   What it does:
   - Finds all reminders still "pending"
   - If 5 minutes have passed since reminder time
   - Marks them as "missed"
========================================================= */
cron.schedule('* * * * *', async () => {
  const now = dayjs().tz(ZONE);

  // Get all reminders that haven't been sent yet
  const pendingReminders = await Reminder.find({ status: 'pending' });

  for (const reminder of pendingReminders) {
    const reminderTime = dayjs(reminder.time).tz(ZONE);

    /**
     * If the reminder time + 5 minutes is still before "now",
     * it means the reminder was never sent → mark as missed.
     */
    if (now.isAfter(reminderTime.add(5, 'minute'))) {
      reminder.status = 'missed';
      await reminder.save();

      console.log(
        `⚠️ Reminder marked MISSED for medication ${reminder.medication}`
      );
    }
  }
});
