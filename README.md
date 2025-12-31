# 🎓 MVP LMS Backend (Node.js + Sequelize)

A **production-ready MVP backend for a Learning Management System (LMS)** built with **Node.js, Express, Sequelize ORM**, and **PostgreSQL/MySQL**.

This repository is designed for **junior developers** who want a solid backend foundation to build, learn, and extend an LMS MVP.

---

## 🚀 Features

### ✅ Authentication & Users
- User registration & login
- Role-based access control (Admin / Instructor / Student)
- JWT authentication

### 📚 Courses & Lessons
- Create and manage courses
- Create lessons under courses
- Ordered lessons for structured learning

### 📈 Lesson Progress Tracking
- Track lesson status (`not_started`, `in_progress`, `completed`)
- Track lesson completion percentage
- Resume learning from last lesson
- Course progress calculation

### 📝 Notes & Downloads
- Upload lesson notes (PDF, DOCX, etc.)
- Download notes per lesson
- Secure file handling

### ▶ Continue Learning
- Automatically resumes from last incomplete lesson
- Stores last accessed lesson per user

### 🧱 Clean Architecture
- MVC-inspired structure
- Sequelize migrations & models
- Centralized error handling
- Environment-based configuration

---

## 🧠 Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL / MySQL
- JWT Authentication
- Multer (File uploads)
- dotenv

---

## 📁 Project Structure

```bash
src/
│
├── config/          # Database & environment config
├── controllers/     # Route logic
├── models/          # Sequelize models
├── migrations/      # Database migrations
├── routes/          # API routes
├── middlewares/     # Auth & error handling
├── services/        # Business logic
├── utils/           # Helper functions
└── app.js           # App entry point
