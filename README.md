# SmartOps – Frontend

A modern, responsive **Project & Task Management Dashboard** built with React and Vite.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Routing | React Router v6 |
| Forms | React Hook Form |
| State Management | Zustand |

---

## Features

- **JWT Authentication** — Secure login and registration with token persistence
- **Protected Routes** — Automatic redirect for unauthenticated users
- **Dashboard** — Real-time overview of projects and tasks with stats
- **Project Management** — Create, view, and delete projects
- **Kanban Task Board** — Visual task management with status columns
- **Task Detail Modal** — Edit task title, description, status, and due date
- **Responsive Design** — Works on desktop and tablet

---

## Pages

| Page | Route | Description |
|---|---|---|
| Login | `/login` | JWT login form |
| Register | `/register` | New user registration |
| Dashboard | `/dashboard` | Overview with stats, projects and tasks |
| Projects | `/projects` | Full project list with create/delete |
| Tasks | `/tasks` | Kanban board with task management |

---

## Running Locally

### Prerequisites
- Node.js 18+
- SmartOps backend running on `http://localhost:8080`

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/smartops-frontend.git
cd smartops-frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

**4. Open in browser**
```
http://localhost:5173
```

---

## Backend

This frontend connects to the [SmartOps Backend API](https://github.com/YOUR_USERNAME/smartops).

Make sure the backend is running before starting the frontend.

---

## Project Structure
```
src/
├── api/
│   └── axios.js          # Axios instance with JWT interceptor
├── store/
│   └── authStore.js      # Zustand auth state management
├── pages/
│   ├── Login.jsx         # Login page
│   ├── Register.jsx      # Register page
│   ├── Dashboard.jsx     # Main dashboard
│   ├── Projects.jsx      # Project management
│   └── Tasks.jsx         # Kanban task board
├── components/
│   └── ProtectedRoute.jsx # Route guard
├── App.jsx               # Routes configuration
└── main.jsx              # Entry point
```

---

## Authentication Flow

1. User registers or logs in
2. JWT token is stored in `localStorage`
3. Axios interceptor attaches token to every request
4. Zustand manages auth state across the app
5. Protected routes redirect unauthenticated users to `/login`

---

## License

MIT License — feel free to use this project as a reference or template.