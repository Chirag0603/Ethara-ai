# Ethara AI — Team Task Manager

A full-stack web application for team project management, task assignment, and progress tracking with role-based access control (Admin/Member).

**Built by Ethara AI**

🔗 **Live URL:** https://ethara-ai-production-9768.up.railway.app/login
📦 **GitHub Repo:** https://github.com/Chirag0603/Ethara-ai.git
---

## 🚀 Features

Secure User Authentication — User registration and login system powered by JWT-based authentication, with automatic Admin access assigned to the first registered user
Access & Permission Management — Multi-level role authorization supporting Admin and Member privileges across the platform and individual projects
Project Workspace Management — Create, update, organize, and monitor projects with detailed descriptions and progress status
Task Workflow System — Interactive Kanban board featuring task stages: To Do, In Progress, Review, and Completed
Collaborative Team Handling — Manage project participants by adding or removing members with permission-based controls
Analytics Dashboard — Live project insights including task distribution, overdue tracking, recent updates, and overall completion metrics
Fully Responsive Interface — Optimized user experience across desktop, tablet, and mobile devices

## ⚙️ Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Frontend   | React + Vite             |
| Backend    | Node.js + Express        |
| Database   | SQLite (sql.js - WASM)   |
| Auth       | JWT + bcryptjs           |
| Routing    | React Router DOM         |
| Styling    | Custom CSS (dark theme)  |
| Deployment | Railway                  |

## 📦 Installation

```bash
git clone https://github.com/Manas1718/Team-Task-Manager.git
cd Team-Task-Manager
npm install
npm run build
npm start
```

App available at `http://localhost:3000`

## 🔑 Environment Variables

```
PORT=3000
JWT_SECRET=your-secret-key-here
```

## 📁 Project Structure

```
ethara-task-manager/
├── server.js              # Express server entry point
├── database.js            # SQLite database (sql.js WASM)
├── middleware/auth.js      # JWT auth & RBAC middleware
├── routes/
│   ├── auth.js            # Signup, Login, Users
│   ├── projects.js        # Project CRUD + Members
│   ├── tasks.js           # Task CRUD + Filtering
│   └── dashboard.js       # Dashboard stats
├── client/                # React Frontend (Vite)
│   └── src/
│       ├── App.jsx, api.js, index.css
│       ├── context/AuthContext.jsx
│       ├── components/Layout.jsx, Modal.jsx
│       └── pages/AuthPage, Dashboard, Projects, ProjectDetail, Tasks, Team
├── public/                # Built React output
├── package.json, Procfile, vercel.json
└── README.md
```

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/auth/users` | List all users |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List user's projects |
| POST | `/api/projects` | Create project |
| GET | `/api/projects/:id` | Get project detail |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/projects/:id/members` | Add member |
| DELETE | `/api/projects/:id/members/:uid` | Remove member |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List user's tasks |
| POST | `/api/tasks/project/:pid` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Get dashboard stats |

## 🔒 Role-Based Access Control

- **Admin**: View all projects, manage all members and tasks
- **Member**: View assigned projects, create/edit tasks in their projects
- **Project Admin**: Project creator — can manage project members
- **First Signup**: Automatically becomes global Admin

## 🌐 Deployment (Railway)

1. Push code to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select `Team-Task-Manager` repo
4. Add env variable: `JWT_SECRET`
5. Generate domain in Settings → Networking
6. App is live!

## ✅ Submission Checklist

- [x] Live URL: https://ethara-ai-production-9768.up.railway.app/login 
- [x] GitHub Repo: https://github.com/Chirag0603/Ethara-ai.git
- [x] README documentation
- [ ] 2–5 min demo video

## 📝 License

MIT
