# 🏥 CareSync - Ehealth Record System

CareSync is a full-stack healthcare web application built using the MERN stack (MongoDB, Express, React, Node.js). It offers a secure and user-friendly platform for patients and healthcare providers to manage medical records, appointments, documents, and more — all in one place.

---

## 🚀 Features

### 👤 Patient
- Secure Sign Up / Login
- View & Edit Personal Profile
- Upload & View Medical Documents
- Book and Manage Appointments
- View Medical Records and Visit History

### 👨‍⚕️ Provider
- Login
- View & Edit Personal Info
- Add Encounter/Visit Notes
---

## 🧰 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer (for medical documents)

---

## ⚙️ Getting Started

### 🛠 Prerequisites

- Node.js (v16+ recommended)
- MongoDB Atlas account
- Git

---

### 📦 Installation

# Clone the Repository
```bash
git clone https://github.com/Divya-sham/Caresync_Ehealth_record.git
cd Caresync_Ehealth_record

# Install backend dependencies
cd backend
npm install

# Create a .env file in backend/ with the following:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Start the backend server
npm start

# Open a new terminal and install frontend dependencies
cd frontend
npm install

# Start the frontend
npm run dev
