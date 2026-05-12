# 💊 Medication & Health Reminder API

A production-ready RESTful API for managing medications, schedules, and automated reminders. Built with Node.js, Express, MongoDB Atlas, JWT authentication, and cron-based background jobs for sending email/SMS reminders.

---

## 📌 Table of Contents

- Project Overview
- Features
- Tech Stack
- Installation
- Environment Variables
- Authentication
- API Endpoints
- Reminder Engine
- Error Handling
- Security

---

## 🧾 Project Overview

This API powers a complete medication reminder system where patients can:

- Add medications
- Set daily reminder times
- Receive automatic email/SMS notifications
- Track upcoming reminders
- Track missed reminders

The backend includes a cron-driven reminder engine that runs every minute and triggers notifications based on medication schedules.

---

## ✨ Features

- JWT Authentication for patients
- MongoDB Atlas cloud database
- Medication CRUD
- Auto-generated reminders
- Cron job runs every minute
- Email notifications (Nodemailer + Gmail App Password)
- SMS notifications (Twilio optional)
- Upcoming reminders endpoint
- Missed reminder detection
- Status tracking: pending, sent, missed
- Clean RESTful API design

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- node-cron
- Nodemailer
- Twilio (optional)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/KungaNyimaGurung/medication-health-api.git
cd medication-reminder-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create .env file

```env
MONGO_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<your_jwt_secret>

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_16_digit_app_password

TWILIO_SID=<optional>
TWILIO_AUTH=<optional>
TWILIO_PHONE=<optional>

PORT=4000
```

### 4️⃣ Start the server

```bash
npm run dev
```

Server runs at:

```bash
http://localhost:4000
```

---

## 🔐 Authentication

Protected routes require:

```bash
Authorization: Bearer <token>
```

### How to get a token

1. Register a patient
2. Login
3. Copy the token
4. Use it in all protected routes

---

## 📡 API Endpoints

### 👤 Patient Authentication

#### Register Patient

```http
POST /api/patients/register
```

Body:

```json
{
  "name": "Patient1",
  "email": "patient1@gmail.com",
  "password": "goodluck123"
}
```

#### Login Patient

```http
POST /api/patients/login
```

Body:

```json
{
  "email": "patient1@gmail.com",
  "password": "goodluck123"
}
```

Response includes token.

---

### 💊 Medication Routes

#### Create Medication

```http
POST /api/medications
```

Headers:

```bash
Authorization: Bearer <token>
```

Body:

```json
{
  "name": "TestMed",
  "dosage": "500mg",
  "times": ["19:45"],
  "startDate": "2026-05-11"
}
```

#### Get All Medications

```http
GET /api/medications
```

---

### ⏰ Reminder Routes

#### Get Upcoming Reminders (Next 24 Hours)

```http
GET /api/reminders/upcoming
```

Headers:

```bash
Authorization: Bearer <token>
```

Response:

```json
{
  "count": 3,
  "reminders": [...]
}
```

---

## 🧠 Reminder Engine (Cron Job)

Runs every minute:

- Checks all medications
- Generates reminders for matching times
- Sends email notifications
- Marks reminders as sent
- Marks overdue reminders as missed

Terminal output example:

```bash
⏰ Auto-reminder created for TestMed2 at 19:51
📧 Email sent to patient1@gmail.com
📨 Email reminder SENT for TestMed2
```

---

## ⚠️ Error Handling

Standard error format:

```json
{
  "error": "Message here"
}
```

### Common errors:

- 400 — Missing fields
- 401 — Invalid token
- 403 — Unauthorized
- 404 — Not found
- 500 — Server error

---

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- No password exposure
- CORS enabled
- Token expiration (24 hours)
- Gmail App Password for SMTP

---

## 📝 Notes

- Reminder engine runs every minute
- Gmail requires a 16-digit App Password
- Times must be in "HH:mm" 24-hour format
- MongoDB Atlas stores all patients, medications, reminders
