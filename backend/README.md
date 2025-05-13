# Description

This document describes the folder and file structure of the project's backend.

The project follows a modular monolithic architecture,
which means that the codebase is organized into feature-based modules (e.g., auth, users, roles)
while still running as a single application.
This provides a scalable and maintainable structure that supports growth and clean separation of concerns.

Supabase is used for fast database setup and seamless connection from the backend.

# Key Concepts

**Modular Structure**
Each feature remains inside the modules/ folder and includes everything related to that feature:

controllers/ – Handles request logic

routes/ – Defines API endpoints

model/ – Sequelize models

middleware/ – Feature-specific middleware

service/ – Business logic

validators/ – Validation logic for requests

This approach encourages separation of concerns and makes the application easier to navigate and scale.

## Folder Structure

```
backend/
├── config/          # Project configuration
│   ├── database.js  # Database configuration
│   └── cors.js      # CORS configuration
|
|── database/        # Centralized initialization of the database, models and their associations
│
├── middlewares/     # Global middleware functions
│
├── migrations/      # Database migrations (creating/modifying tables)
|
├── modules/         # Modular application features (auth, users, roles, etc.)
│   ├── auth/        # Feature-specific folders with controllers, models, routes, etc.
│   ├── users/
│   └── ...
│
├── routes/          # Centralized API route registration
│   └── index.js        # Main file to register all routes
│
├── seeders/         # Database seed scripts
│
├── uploads/         # Uploaded file storage (e.g., user avatars)
│
├── utils/           # Global utilities and helper functions
│
├── app.js           # App initialization and middleware setup
├── server.js        # Server startup
├── .gitignore       # Files to exclude from version control
├── package.json     # Dependencies and scripts
└── README.md        # Documentation
```

## Folder and File Descriptions

### 1. `config/`

Contains configuration files for the project, like database settings and CORS policy:

-  **`database.js`**: PostgreSQL database configuration using Sequelize.
-  **`cors.js`**: CORS policy configuration for the server.

### 2. `database/`

Initializes Sequelize connection, imports models, and defines relationships.

### 3. `middlewares/`

Global middleware used in the application.

### 4. `migrations/` & `seeders/`

Database schema migration files and seed data files.

### 5. `modules/`

Each module handles a specific domain or feature. Usually includes controller, model, route, service, middleware, and validation logic.

### 6. `routes/`

Main entry point for connecting all routes together.

-  **`index.js`**: Registers all routes.

### 7. `uploads/`

Stores files uploaded by users, such as avatars or documents.

### 8. `utils/`

Reusable helper functions used across the application.

### 9. `app.js`

Main application setup: initializes express, middlewares, routes, cors, etc.

### 10. `server.js`

Starts the server and connects to the database.

---

## Getting Started

1. **Clone the Repository**:

```bash
   git clone <repository_url>
```

```bash
cd backend
```

2. **Install Dependencies**:

```bash
   npm install
```

3. **Set Up Environment Variables**:
   Create a `.env` file and add the following variables:

   DB_CONNECTION_STRING=[your_database_connection_string]
   JWT_ACCESS_SECRET=[your_jwt_access_secret]
   JWT_REFRESH_SECRET=[your_jwt_refresh_secret]
   BCRYPT_SALT_ROUNDS=[your_sault_rouds]
   EMAIL_USER=[email_for_sending_emails]
   EMAIL_PASS=[email_password_for_sending_emails]
   PORT=[your_port_for_application]

4. **Run the Server**:

```bash
   npm run dev
```

---

## Standard Scripts

-  **`npm run dev`**: Run the server in development mode with `nodemon`.
-  **`npm start`**: Run the server in production mode.

---
