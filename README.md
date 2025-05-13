# CRM System – Full-stack Project

This project is a full-stack CRM-style application
built with **React**, **TypeScript**, **Node.js**, **Express**, and **PostgreSQL**.

> **Note**: This is an ongoing pet project and currently focuses on core functionality such as user authentication and basic user management (CRUD).
> Additional features like role-based access control, analytics, customer records tracking, and calendar integration are planned for future development.

---

## Tech Stack

### Frontend

-  **React** with **TypeScript**
-  **Redux Toolkit** (with RTK Query)
-  **React Router v7** (via `react-router-dom`)
-  **SCSS Modules**
-  **Vite** (for fast development/building)
-  **Vitest** & **React Testing Library** for unit testing

### Backend

-  **Node.js** with **Express**
-  **PostgreSQL** + **Sequelize** ORM
-  **JWT** for authentication
-  **Nodemailer** for email functionality
-  **bcrypt** for password hashing

---

## Features (So Far)

-  User registration & login (with JWT)
-  Access & refresh token system
-  Basic account settings
-  CRUD operations for users
-  Protected routes (frontend + backend)
-  Form validation (with feedback)
-  Modular, scalable architecture (both frontend and backend)
-  Dark/light theme toggle
-  Unit tests for frontend components

---

## Project Structure

The project is divided into two parts:

<pre> ```
crm-proj/
|
├── backend/ # Express + PostgreSQL + Sequelize
|
└── frontend/ # React + Redux Toolkit + Vite
``` </pre>

Each part has its own README explaining folder structure, setup, and usage in detail.

---

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd crm-proj
   ```
2. **Setup Backend**: Follow the backend/README.md for environment variables and startup steps.

3. **Setup Frontend**: Follow the frontend/README.md for environment setup and development scripts.

---

## Plans & Roadmap

-  Role-based access (director, admin, staff)
-  Creating and administering customer records
-  Calendar view
-  Dashboard with analytics and statistics
-  Email notifications
-  Advanced filtering & search

---

## Motivation

This project is being developed to improve fullstack skills, practice scalable architecture, and explore real-world patterns in a modular monolithic app. It also aims to demonstrate good testing practices and a maintainable codebase.
