import cron from 'node-cron';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

import Medication from '../models/Medication.js';
import Reminder from '../models/Reminder.js';
import Patient from '../models/Patient.js';

import { sendEmail } from '../utils/sendEmail.js';
import { medicationReminderTemplate } from '../utils/emailTemplates.js';

dayjs.extend(utc);
dayjs.extend(timezone);

// Set your timezone (change if needed)
const ZONE = 'America/New_York';

/* ---------------------------------------------------------
   JOB 1: AUTO‑CREATE REMINDERS BASED ON MEDICATION TIMES
--------------------------------------------------------- */
cron.schedule('* * * * *', async () => {
  const now = dayjs().tz(ZONE).startOf('minute');

  const medications = await Medication.find();

  for (const med of medications) {
    for (const time of med.times) {
      const reminderTime = dayjs(
        `${now.format('YYYY-MM-DD')} ${time}`,
        'YYYY-MM-DD HH:mm'
      )
        .tz(ZONE)
        .startOf('minute');

      if (now.isSame(reminderTime)) {
        const exists = await Reminder.findOne({
          medication: med._id,
          time: reminderTime.toDate()
        });

        if (!exists) {
          // Create reminder
          await Reminder.create({
            patient: med.patient,
            medication: med._id,
            time: reminderTime.toDate(),
            status: 'pending'
          });

          console.log(`⏰ Auto-reminder created for ${med.name} at ${time}`);

          // Fetch patient for email
          const patient = await Patient.findById(med.patient);

          if (patient?.email) {
            const html = medicationReminderTemplate(
              patient.name,
              med.name,
              reminderTime.format('hh:mm A')
            );

            const sent = await sendEmail(
              patient.email,
              `Medication Reminder: ${med.name}`,
              html
            );

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

/* ---------------------------------------------------------
   JOB 2: AUTO‑MARK MISSED REMINDERS
--------------------------------------------------------- */
cron.schedule('* * * * *', async () => {
  const now = dayjs().tz(ZONE);

  const pendingReminders = await Reminder.find({ status: 'pending' });

  for (const reminder of pendingReminders) {
    const reminderTime = dayjs(reminder.time).tz(ZONE);

    // If 5 minutes passed and still pending → mark as missed
    if (now.isAfter(reminderTime.add(5, 'minute'))) {
      reminder.status = 'missed';
      await reminder.save();

      console.log(
        `⚠️ Reminder marked MISSED for medication ${reminder.medication}`
      );
    }
  }
});
