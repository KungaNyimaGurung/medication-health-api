# 💊 Medication & Health Reminder API

A production-ready RESTful API for managing medications, schedules, and automated reminders. Built with Node.js, Express, MongoDB Atlas, JWT authentication, and cron-based background jobs for sending email/SMS reminders.

This project is portfolio-ready because it demonstrates:
Authentication
CRUD operations
MongoDB relationships
REST API design
Background jobs
Validation and security
Real-world business logic

---

Patient Model Design:
| Key       | Data Type | Description                 |
| --------- | --------- | --------------------------- |
| name      | String    | Patient full name           |
| email     | String    | Patient email/login         |
| phone     | String    | Patient contact number (optional)     |
| password  | String    | Encrypted password          |
| _id       | ObjectId  | Auto-generated MongoDB ID   |
| createdAt | Date      | Document creation timestamp |
| updatedAt | Date      | Last update timestamp       |



Medication Model Design:

| Key       | Data Type | Description                 |
| --------- | --------- | --------------------------- |
| patient   | ObjectId  | References Patient model    |
| name      | String    | Medication name             |
| dosage    | String    | Medication dosage           |
| frequency | Number    | Times per day               |
| times     | Array     | Reminder times              |
| startDate | Date      | Medication start date       |
| endDate   | Date      | Medication end date         |
| notes     | String    | Extra instructions          |
| isActive  | Boolean   | Active/inactive status      |
| _id       | ObjectId  | Auto-generated MongoDB ID   |
| createdAt | Date      | Document creation timestamp |
| updatedAt | Date      | Last update timestamp       |


HealthLog Model Design:
| Key       | Data Type | Description                 |
| --------- | --------- | --------------------------- |
| patient   | ObjectId  | References Patient model    |
| symptoms  | String    | Patient symptoms            |
| mood      | String    | Patient mood status         |
| painLevel | Number    | Pain level from 0–10        |
| notes     | String    | Additional health notes     |
| _id       | ObjectId  | Auto-generated MongoDB ID   |
| createdAt | Date      | Document creation timestamp |
| updatedAt | Date      | Last update timestamp       |


Reminder Model Design:
| Key        | Data Type | Description                                   |
| ---------- | --------- | --------------------------------------------- |
| patient    | ObjectId  | References Patient model                      |
| medication | ObjectId  | References Medication model                   |
| time       | Date      | Scheduled reminder time                       |
| status     | String    | Reminder status (`pending`, `sent`, `missed`) |
| _id        | ObjectId  | Auto-generated MongoDB ID                     |
| createdAt  | Date      | Document creation timestamp                   |
| updatedAt  | Date      | Last update timestamp                         |


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

🧩 Core Real World Problems It Solves
•    People forget to take medications
•    They lose track of doses
•    They forget doctor appointments
•    They want to log symptoms or side effects
•    They need reminders at specific times

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

Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

Authentication
- JWT
- bcryptjs

Utilities
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
Main Dependencies
```bash
npm install express mongoose dotenv cors morgan bcryptjs jsonwebtoken express-validator node-cron
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
  "frequency":1,
  "times": "16:20",
  "startDate": "2026-05-12"
}
```

#### Get All Medications

```http
GET /api/medications
```

---

### ⭐ HealthLogs Routes

#### Create HealthLogs

```http
POST /api/healthLogs
```

Headers:

```bash
Authorization: Bearer <token>
```

Body:

```json
{
  "symptoms": "Headache and slight dizziness",
  "mood": "Tired",
  "painLevel": 4,
  "notes": "Took medication late today."
}
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
