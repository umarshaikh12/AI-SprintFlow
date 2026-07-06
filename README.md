# 🚀 AI SprintFlow

> AI-powered Agile Sprint Planning & Project Management Platform built with the MERN Stack and Google Gemini AI.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-22-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![AWS](https://img.shields.io/badge/AWS-EC2-orange)

---

## 🌐 Live Demo

🔗 **Website:** https://aisprintflow.duckdns.org

---

# 📖 Overview

AI SprintFlow is a modern Agile Project Management platform that leverages Google's Gemini AI to automate sprint planning, story point estimation, task breakdown, and sprint summaries.

The application enables teams to manage projects, organize sprints, track tasks, and improve productivity using AI-assisted workflows.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes

---

## 📁 Project Management

- Create Projects
- Update Projects
- Delete Projects
- View Project Dashboard

---

## 🏃 Sprint Management

- Create Sprint
- Edit Sprint
- Delete Sprint
- Sprint Dashboard

---

## ✅ Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Track Task Status

---

## 🤖 AI Features

Powered by **Google Gemini AI**

- AI Sprint Generator
- AI Story Point Estimation
- AI Task Breakdown
- AI Sprint Summary

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

## AI

- Google Gemini API

---

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- AWS EC2
- Nginx
- PM2
- Let's Encrypt SSL

---

# ☁ Deployment Architecture

```
                    User
                     │
                     ▼
      https://aisprintflow.duckdns.org
                     │
                 HTTPS (SSL)
                     │
                 AWS EC2
                     │
                   Nginx
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
 Frontend (React)         Backend (Node.js)
      Docker                 Docker
        │
        ▼
   MongoDB Atlas
```

---

# 📂 Project Structure

```
AI-SprintFlow
│
├── client/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── Dockerfile
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── docker-compose.yml
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/umarshaikh12/AI-SprintFlow.git
```

```
cd AI-SprintFlow
```

---

## Backend

```
cd server
npm install
npm start
```

---

## Frontend

```
cd client
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# 🐳 Docker

Build Images

```bash
docker compose build
```

Run Containers

```bash
docker compose up -d
```

Stop Containers

```bash
docker compose down
```

---

# 🚀 CI/CD

Deployment is fully automated using **GitHub Actions**.

Whenever code is pushed to the **main** branch:

```
git push
        │
        ▼
GitHub Actions
        │
        ▼
SSH into AWS EC2
        │
        ▼
docker compose up -d --build
        │
        ▼
Application Updated
```

---

# 🔒 Security

- HTTPS enabled using Let's Encrypt
- JWT Authentication
- Protected APIs
- Nginx Reverse Proxy
- Secure Environment Variables

---

# 📸 Screenshots

> Add screenshots of:

- Login Page
- Dashboard
- Project Management
- Sprint Board
- AI Sprint Generator
- Task Management

---

# 👨‍💻 Developed By

**Umar Shaikh**

MCA Graduate | Full Stack Developer

- GitHub: https://github.com/umarshaikh12
- LinkedIn: https://www.linkedin.com/in/umar-shaikh-bb4a34229/

---

# 📌 Future Enhancements

- Team Collaboration
- Email Notifications
- Real-Time Updates
- Calendar Integration
- Analytics Dashboard
- File Uploads
- Role-Based Access Control

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

---

# 📜 License

This project is licensed under the MIT License.
