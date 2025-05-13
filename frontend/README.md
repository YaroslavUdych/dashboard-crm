# Description

This document describes the folder and file structure of the frontend part of the project.

The project uses **React + TypeScript** and follows a **modular, feature-based architecture** with centralized state management using **Redux Toolkit**. It's structured to be scalable, maintainable, and testable.

---

## Folder Structure

frontend/
├── public/ # Static files served as-is
│ ├── avatars/ # Default avatar images
│ ├── defaultUserImage.webp
│ └── favicon.ico
│
├── src/ # Main source directory
│ ├── assets/ # Static resources like fonts and images
│ │ ├── fonts/
│ │ └── images/
│ │
│ ├── components/ # Reusable UI components (with **test** folders)
│ │ ├── Breadcrumbs/
│ │ ├── Button/
│ │ └── ...
│ │
│ ├── constants/ # Application-wide constants
│ │
│ ├── forms/ # Form components (e.g. login, registration)
│ │
│ ├── hooks/ # Custom React hooks
│ │
│ ├── layout/ # App and Auth layouts
│ │ ├── app-layout/
│ │ ├── auth-layout/
│ │ └── components/
│ │
│ ├── pages/ # Route-based views (feature pages)
│ │ ├── home/
│ │ ├── login/
│ │ └── ...
│ │
│ ├── routing/ # Route definitions and guards
│ │ ├── AppRoutes.tsx
│ │ ├── ProtectedRoutes.tsx
│ │ └── ...
│ │
│ ├── store/ # Redux Toolkit store (API + slices)
│ │ ├── api/
│ │ └── slices/
│ │
│ ├── styles/ # Global SCSS styles and variables
│ │
│ ├── utils/ # Utility functions
│ │
│ ├── App.tsx # Root component
│ ├── main.tsx # React app entry point
│ └── vite-env.d.ts # Vite environment types
│
├── .env.development # Local development environment variables
├── vite.config.ts # Vite configuration
├── tsconfig.app.json # TS config for app
├── tsconfig.node.json # TS config for tools
├── eslint.config.js # ESLint configuration
├── prettier.config.js # Prettier configuration
└── README.md # This file

---

## Folder and File Descriptions

### 1. `public/`

Static files served by Vite as-is (e.g., `favicon.ico`, avatar placeholders).

### 2. `src/assets/`

Holds static assets such as custom fonts and images.

### 3. `src/components/`

Modular, reusable React components. Each component remains in its own folder and may contain:

- `.tsx` file for logic and markup
- `.module.scss` for styling
- `__test__/` folder for unit tests

### 4. `src/constants/`

Global app constants (e.g., enums, config flags).

### 5. `src/forms/`

Form components used across the app (e.g., login, create user).

### 6. `src/hooks/`

Custom hooks for business logic or DOM behavior (`useModal`, `useDeviceType`, etc.).

### 7. `src/layout/`

Shared layout components for different parts of the app:

- `app-layout/`: Layout for authenticated sections
- `auth-layout/`: Layout for auth pages (login, etc.)

### 8. `src/pages/`

Pages mapped to routes, split by feature: `home/`, `login/`, `create-user/`, etc.

### 9. `src/routing/`

Handles application routes and route guards.

- `ProtectedRoutes.tsx`: Routes that require authentication
- `PublicRoutes.tsx`: Publicly accessible routes

### 10. `src/store/`

Redux Toolkit configuration:

- `api/`: RTK Query endpoints (e.g., `authApi.ts`, `userApi.ts`)
- `slices/`: Feature-based slices (e.g., `themeSlice.ts`)

### 11. `src/styles/`

Global styles, SCSS variables, resets, ripple effects, and theme support.

### 12. `src/utils/`

Helper functions (e.g., phone formatting, localStorage helpers).

### 13. `App.tsx` / `main.tsx`

App root and React entry file respectively.

---

## Getting Started

1. **Clone the Repository**:

```bash
   git clone <repository_url>
```

```bash
cd frontend
```

2. **Install Dependencies**:

```bash
   npm install
```

3. **Set Up Environment Variables**:

   Create a `.env` file and add the following variables:

   VITE_API_BASE_URL=http://localhost:5000

Replace with your backend URL if different.

4. **Start development server**:

```bash
   npm run dev
```

5. **Run unit tests**:

```bash
   npm run test
```

6. **Build for production**:

```bash
   npm run build
```
