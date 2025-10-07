# CourseHub - Course Management API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)


---

## 🚀 About

**CourseHub** is a modular course management API built with **Node.js**, **Express**, and **MongoDB**, designed to manage **courses**, **modules**, and **lessons** efficiently. It supports secure user authentication, role-based access control, and media uploads via **Cloudinary**.

**Test the App With Demo login Credential**--
**Email**:test@gmail.com
**Pass**:pass1234

---

## ✨ Features

- **Courses CRUD**: Create, read, update, delete courses
- **Modules CRUD**: Manage modules within courses
- **Lessons CRUD**: Manage lessons within modules
- **Nested population**: Fetch courses with all modules and lessons in a single request
- **Authentication**: JWT-based login/signup
- **Role-based Access Control**: Admin vs regular user permissions
- **Media Uploads**: Images/videos for courses/lessons via Multer + Cloudinary
- **CORS & Cookies**: Cross-origin requests supported with credentials

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT, HTTP-only cookies  
- **File Uploads:** Multer + Cloudinary  
- **Deployment:** Vercel  

---



# CourseHub - Course Management API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 🚀 About

**CourseHub** is a modular course management API built with **Node.js**, **Express**, and **MongoDB**, designed to manage **courses**, **modules**, and **lessons** efficiently. It supports secure user authentication, role-based access control, and media uploads via **Cloudinary**.

---

## ✨ Features

- **Courses CRUD**: Create, read, update, delete courses
- **Modules CRUD**: Manage modules within courses
- **Lessons CRUD**: Manage lessons within modules
- **Nested population**: Fetch courses with all modules and lessons in a single request
- **Authentication**: JWT-based login/signup
- **Role-based Access Control**: Admin vs regular user permissions
- **Media Uploads**: Images/videos for courses/lessons via Multer + Cloudinary
- **CORS & Cookies**: Cross-origin requests supported with credentials

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT, HTTP-only cookies  
- **File Uploads:** Multer + Cloudinary  
- **Deployment:** Vercel  

---

## 📁 Folder Structure



coursehub/
│
├─ controllers/ # Business logic for courses, modules, lessons, users
├─ models/ # Mongoose schemas
├─ routes/ # Express route definitions
├─ utils/ # Utilities (AppError, email, etc.)
├─ middleware/ # Auth & error handling middlewares
├─ config/ # DB connection, environment config
├─ server.js # Backend entry point
└─ package.json


---

## 🔑 Authentication & Authorization

- JWT tokens are issued on **signup** and **login**  
- Tokens are stored in **HTTP-only cookies**  
- Middleware `protect` ensures only logged-in users can access protected endpoints  
- Middleware `restrictTo('admin')` ensures only admins can modify resources  

---

## ⚠ Error Handling

- Global error handler returns standardized JSON responses  
- Invalid routes return **404 Not Found**  
- Custom `AppError` class used for consistent error messages  

---

## 📌 Deployment Notes (Vercel)

- Set environment variables in the Vercel dashboard  
- Use `app.set('trust proxy', 1)` in production for secure cookies  
- Ensure proper **CORS configuration** with your frontend origin  
- Handle `OPTIONS` requests for preflight when using credentials  

---


