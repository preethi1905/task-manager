# Task Manager (Full-Stack MERN)

A robust full-stack task management web application built with **React, Node.js, Express, MongoDB, JavaScript, CSS, and Webpack**.

Designed with clean architecture patterns: an MVC backend with Mongoose validation, a container/presentational split on the frontend, an Object-Oriented `TaskManager` service layer, component-scoped BEM CSS, and production deployment configuration for **Vercel**.

---

## 🌟 Key Features & Architectural Highlights

- **Full Task Lifecycle Management**:
  - Full CRUD: Create, read, update, delete tasks.
  - Three-tier status tracking: **To Do**, **In Progress**, and **Done**.
  - Dynamic status filtering via REST API (`?status=todo|in-progress|done`) and one-click quick-filter counters.
  - Priority levels (`low`, `medium`, `high`) and due-date tracking with visual overdue indicators.
- **Frontend Architecture**:
  - **Stateful Container & Stateless Presentational Components**:
    - `TaskListContainer`: Stateful container managing data fetching, status filters, task mutations, and application state.
    - `TaskList`, `TaskItem`, `TaskForm`: Stateless presentational components rendering props and delegating user events.
  - **Object-Oriented `TaskManager` Class**:
    - Encapsulates all REST API interactions (`fetchAll`, `fetchOne`, `create`, `update`, `setStatus`, `remove`) into a clean class in `src/utils/TaskManager.js`.
    - Components never invoke `fetch` directly, ensuring separation of concerns.
- **Backend Architecture**:
  - **MVC Pattern**:
    - `models/Task.js`: Mongoose schema with strict validation rules, enums, character limits, and automatic timestamps (`createdAt`, `updatedAt`).
    - `controllers/taskController.js`: Business logic and HTTP response handling with defensive error checking.
    - `routes/taskRoutes.js`: Clean REST routing with route chaining.
  - Connection pooling with serverless cache optimization for deployment on Vercel.
- **Custom Webpack & Babel Build Pipeline**:
  - Built from scratch with Webpack 5 and Babel.
  - `babel-loader` for modern ES6+ and JSX compilation.
  - `style-loader` and `css-loader` for bundling CSS.
  - `webpack-dev-server` with automated `/api` reverse-proxy targeting `http://localhost:5000`.
- **Component-Scoped, BEM-Style CSS**:
  - Strictly follows Block-Element-Modifier (`block__element--modifier`) naming conventions.
  - Component-scoped stylesheets (`TaskItem.css`, `TaskForm.css`, `App.css`) imported directly into corresponding components.
- **Production-Ready Vercel Deployment**:
  - Pre-configured `vercel.json` with monorepo full-stack serverless functions and static build output.
  - Serverless function wrapper in `api/index.js` exporting the Express application.

---

## 📂 Project Structure

```
task-manager/
├── api/
│   └── index.js                   # Vercel serverless function entry point
├── backend/
│   ├── config/
│   │   └── db.js                  # Mongoose connection with serverless connection pooling
│   ├── controllers/
│   │   └── taskController.js      # MVC Controller: CRUD + status filter logic
│   ├── models/
│   │   └── Task.js                # MVC Model: Mongoose schema with validations & timestamps
│   ├── routes/
│   │   └── taskRoutes.js          # MVC Routes: REST endpoints
│   ├── .env.example               # Backend environment variable template
│   ├── package.json               # Backend dependencies and scripts
│   └── server.js                  # Express app setup and server listener
├── frontend/
│   ├── public/
│   │   └── index.html             # HTML template
│   ├── src/
│   │   ├── components/            # Stateless presentational components
│   │   │   ├── TaskForm.jsx       # Task creation form
│   │   │   ├── TaskItem.jsx       # Task card with inline edit, status toggle & delete
│   │   │   └── TaskList.jsx       # Task list renderer with loading/empty states
│   │   ├── containers/            # Stateful container components
│   │   │   └── TaskListContainer.jsx # State management, stats counters & filter bar
│   │   ├── styles/                # Component-scoped BEM CSS
│   │   │   ├── App.css
│   │   │   ├── TaskForm.css
│   │   │   └── TaskItem.css
│   │   ├── utils/
│   │   │   └── TaskManager.js     # OOP Class managing API communication & lifecycles
│   │   ├── App.jsx                # Application root component
│   │   └── index.js               # React 18 DOM mount point
│   ├── .babelrc                   # Babel presets for JSX and ESNext
│   ├── package.json               # Frontend dependencies and scripts
│   ├── vercel.json                # Standalone frontend Vercel rewrite configuration
│   └── webpack.config.js          # Webpack 5 configuration with dev-server proxy
├── .gitignore                     # Git ignore rules (node_modules, .env, dist, .vercel)
├── package.json                   # Root monorepo script runner
├── README.md                      # Comprehensive project documentation
└── vercel.json                    # Root full-stack Vercel deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local instance running on `mongodb://127.0.0.1:27017` or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

---

### 1. Monorepo Setup (Root Directory)

Install dependencies for both backend and frontend from the project root:

```bash
npm run install:all
```

---

### 2. Backend Setup

```bash
cd backend

# Create .env from template
cp .env.example .env

# Start backend server in development mode (nodemon)
npm run dev
```

The Express API will start on `http://localhost:5000`.

---

### 3. Frontend Setup

In a separate terminal:

```bash
cd frontend

# Start Webpack dev server with hot reloading & API proxy
npm start
```

The React application will open in your browser at `http://localhost:3000`. Any requests to `/api` are automatically proxied to `http://localhost:5000`.

---

### 4. Production Webpack Build

To generate the optimized production bundle:

```bash
cd frontend
npm run build
```

This compiles minified, cache-busted assets into `frontend/dist/`.

---

## 📡 REST API Reference

All task endpoints are prefixed with `/api/tasks`.

| Method | Endpoint | Query / Body Parameters | Description |
|---|---|---|---|
| `GET` | `/api/tasks` | `?status=todo` / `in-progress` / `done` | List all tasks (or filtered by status) |
| `GET` | `/api/tasks/:id` | `id` (MongoDB ObjectId) | Get single task by ID |
| `POST` | `/api/tasks` | `{ title, description, priority, dueDate, status }` | Create a new task |
| `PUT` | `/api/tasks/:id` | `{ title?, description?, priority?, dueDate?, status? }` | Update task details or status |
| `DELETE` | `/api/tasks/:id` | `id` (MongoDB ObjectId) | Delete task by ID |

### Example Payloads

#### Create Task (`POST /api/tasks`)
```json
{
  "title": "Build Webpack Pipeline",
  "description": "Configure Babel loader, CSS loader, and dev server proxy",
  "priority": "high",
  "status": "in-progress",
  "dueDate": "2026-11-05"
}
```

#### Update Task (`PUT /api/tasks/:id`)
```json
{
  "status": "done"
}
```

---

## ☁️ Deployment on Vercel

This repository is configured for seamless deployment on [Vercel](https://vercel.com).

### Option 1: Full-Stack Monorepo Deployment (Recommended)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Sign in to **Vercel** and select **Add New Project** -> Import your repository.
3. Keep the **Root Directory** as `./` (the repository root). The root `vercel.json` will automatically configure:
   - Frontend static compilation via `@vercel/static-build` outputting `frontend/dist`.
   - Backend Express serverless functions via `@vercel/node`.
4. In the **Environment Variables** section on Vercel, add:
   - `MONGO_URI`: Your MongoDB Atlas connection string:
     ```
     mongodb+srv://<username>:<password>@cluster.mongodb.net/task_manager?retryWrites=true&w=majority
     ```
   - `NODE_ENV`: `production`
5. Click **Deploy**. Vercel will build the frontend bundle, deploy the serverless API routes, and provide your live URL!

---

### Option 2: Standalone Frontend on Vercel

If you prefer to host your backend on Render, Railway, or Heroku:
1. Set the Vercel Root Directory to `frontend`.
2. Set the build command to `npm run build` and output directory to `dist`.
3. Set the environment variable:
   - `API_URL`: Your hosted backend URL (e.g. `https://my-backend.railway.app`).
4. Click **Deploy**.
