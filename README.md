# Task Manager — Full-Stack Task Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks
through their full lifecycle — create, update, delete, and status tracking (To Do,
In Progress, Done) — with real-time persistence via a REST API.

## Architecture

**Frontend (React + Webpack)**
- **Container/presentational split**: `TaskListContainer` is a stateful container
  that owns data fetching and business logic; `TaskList`, `TaskItem`, and `TaskForm`
  are stateless presentational components that just render props.
- **OOP task lifecycle management**: `src/utils/TaskManager.js` is a JavaScript
  class that encapsulates all REST calls (create/read/update/delete/status
  transitions) so components never talk to `fetch` directly.
- **Component-scoped CSS**: each component has its own BEM-style CSS file
  (`TaskItem.css`, `TaskForm.css`) imported directly into that component, keeping
  styles maintainable and scoped to the component that owns them.
- Bundled with **Webpack** (`webpack.config.js`) using `babel-loader` for
  JSX/ES6, `style-loader`/`css-loader` for CSS, and a dev server with an API proxy.

**Backend (Node + Express + MongoDB)**
- RESTful API (`/api/tasks`) with full CRUD + status-filtering support.
- Mongoose schema/model (`models/Task.js`) with validation and timestamps.
- MVC-style structure: `routes/` → `controllers/` → `models/`.

## Project Structure

```
task-manager/
├── backend/
│   ├── config/db.js
│   ├── controllers/taskController.js
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── components/       # stateless presentational components
    │   │   ├── TaskItem.jsx
    │   │   ├── TaskList.jsx
    │   │   └── TaskForm.jsx
    │   ├── containers/       # stateful container components
    │   │   └── TaskListContainer.jsx
    │   ├── utils/
    │   │   └── TaskManager.js   # OOP class for task lifecycle + API calls
    │   ├── styles/            # component-scoped CSS
    │   ├── App.jsx
    │   └── index.js
    ├── webpack.config.js
    ├── .babelrc
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env   # edit MONGO_URI if needed
npm run dev             # starts on http://localhost:5000
```

### 2. Frontend setup

```bash
cd frontend
npm install
npm start                # starts on http://localhost:3000
```

The dev server proxies `/api` requests to `http://localhost:5000`, so the two run
side by side during development.

### 3. Production build

```bash
cd frontend
npm run build             # outputs static assets to frontend/dist
```

Serve `frontend/dist` with any static file server, or wire it into the Express
app with `express.static`.

## API Reference

| Method | Endpoint          | Description                          |
|--------|-------------------|---------------------------------------|
| GET    | `/api/tasks`       | List all tasks (optional `?status=`) |
| GET    | `/api/tasks/:id`   | Get a single task                    |
| POST   | `/api/tasks`       | Create a task                        |
| PUT    | `/api/tasks/:id`   | Update a task (including status)     |
| DELETE | `/api/tasks/:id`   | Delete a task                        |

## Tools Used
React, Node.js, Express, MongoDB, JavaScript, CSS, Webpack
