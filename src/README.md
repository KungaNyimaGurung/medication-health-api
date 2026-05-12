💊 Medication & Health Reminder API
A complete RESTful backend system for managing medications, schedules, and automated reminders. Built with Node.js, Express, MongoDB Atlas, JWT authentication, and a cron‑based reminder engine that sends real‑time email notifications to patients.
📌 Table of Contents
Project Overview
Features
Tech Stack
Installation & Setup
Environment Variables
Authentication
API Endpoints
Reminder Engine
Error Handling
Security
🧾 Project Overview
The Medication & Health Reminder API allows patients to:
Register and log in
Add medications with dosage and daily reminder times
Automatically receive email reminders at the exact scheduled time
View upcoming reminders
Track reminder status (pending, sent, missed)
A background cron job runs every minute to check medication schedules and trigger reminders.
✨ Features
JWT‑based authentication
Patient registration & login
Medication CRUD
Auto‑generated reminders
Cron job runs every minute
Email notifications using Gmail App Password
MongoDB Atlas cloud database
Upcoming reminders endpoint
Missed reminder detection
Clean RESTful API structure
🛠 Tech Stack
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT Authentication
bcryptjs
node-cron
Nodemailer
⚙️ Installation & Setup
1️⃣ Clone the repository
Code
git clone <your-repo-url>
cd medication-reminder-api
2️⃣ Install dependencies
Code
npm install
3️⃣ Create .env file
Code
MONGO_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<your_jwt_secret>

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_16_digit_app_password

PORT=4000
4️⃣ Start the server
Code
npm run dev
Server runs at:
Code
http://localhost:4000
🔐 Authentication
Protected routes require:
Code
Authorization: Bearer <token>
How to get a token
Register a patient
Login
Copy the token
Use it in all protected routes
📡 API Endpoints
👤 Patient Authentication
Register Patient
POST /api/patients/register
Body:
Code
{
  "name": "Kunga",
  "email": "kunganyima171@gmail.com",
  "password": "goodluck123"
}
Login Patient
POST /api/patients/login
Body:
Code
{
  "email": "kunganyima171@gmail.com",
  "password": "goodluck123"
}
Response includes JWT token.
💊 Medication Routes
Create Medication
POST /api/medications
Headers:
Code
Authorization: Bearer <token>
Body:
Code
{
  "name": "TestMed",
  "dosage": "500mg",
  "times": ["19:45"],
  "startDate": "2026-05-11"
}
Get All Medications
GET /api/medications
⏰ Reminder Routes
Get Upcoming Reminders
GET /api/reminders/upcoming
Headers:
Code
Authorization: Bearer <token>
Response:
Code
{
  "count": 3,
  "reminders": [...]
}
🧠 Reminder Engine (Cron Job)
A background job runs every minute and:
Checks all medications
Matches current time with medication times
Creates reminders
Sends email notifications
Marks reminders as sent
Marks overdue reminders as missed
Example Terminal Output
Code
MongoDB Connected: ac-dklv2qm-shard-00-02.wlnetbf.mongodb.net
⏰ Auto-reminder created for TestMed2 at 19:51
📧 Email sent to kunganyima171@gmail.com
📨 Email reminder SENT for TestMed2
⚠️ Error Handling
Standard error format:
Code
{
  "error": "Message here"
}
Common errors:
400 — Missing fields
401 — Invalid token
403 — Unauthorized
404 — Not found
500 — Server error
🔒 Security Features
JWT authentication
Password hashing with bcrypt
No password exposure
CORS enabled
Token expiration (24 hours)
Gmail App Password for SMTP
📝 Notes
Reminder engine runs every minute
Gmail requires a 16‑digit App Password
Times must be in "HH:mm" 24‑hour format
MongoDB Atlas stores all patients, medications, reminders
