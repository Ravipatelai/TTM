# Team Task Manager

<<<<<<< HEAD
A minimal, clean, and full-stack project management application where admins can create projects and tasks, and members can view and update their assigned tasks.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS v3, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT stored in localStorage

## Getting Started Locally

### 1. Database Setup
Make sure you have MongoDB running locally, or replace the `MONGO_URI` in `server/.env` with your MongoDB Atlas URI.

### 2. Environment Variables
Create a `.env` file inside the `server/` folder based on the provided setup. Example:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=yourjwtkey
```

### 3. Install Dependencies
Run the following command in the root folder to install all backend and frontend dependencies:
```bash
npm run install:all
```

### 4. Running the Application
You can run the backend and frontend separately for development:
- **Terminal 1 (Backend)**: `cd server && node server.js`
- **Terminal 2 (Frontend)**: `cd backend && npm run dev`

Navigate to `http://localhost:5173` in your browser.

## Deployment on Railway

This repository is structured to be easily deployed on Railway as a single service.

1. Connect your GitHub repository to a new Railway project.
2. Railway will automatically detect the root `package.json` and use the `npm run build` script to build the React frontend and install server dependencies.
3. Railway will start the application using the `npm start` script (`node server/server.js`).
4. Set the following environment variables in Railway:
   - `MONGO_URI` (Your MongoDB Atlas connection string)
   - `JWT_SECRET` (A strong random secret)
   - `NODE_ENV` = `production`
5. Since `NODE_ENV` is set to `production`, the Express server will automatically serve the built React files from `backend/dist`.

## Features
- **Role-Based Access**: Admins can create tasks and projects. Members can only update the status of tasks assigned to them.
- **Dashboard**: Simple overview of Total, Completed, and Overdue tasks.
- **Project Tracking**: Group tasks by projects easily.
=======
A full-stack project built to manage team workflows in a simple and structured way. The goal was to create a lightweight alternative to complex tools like Trello or Jira, focusing on clarity, role-based control, and real-time task tracking.

This application allows admins to manage projects and assign work, while team members can track and update their responsibilities efficiently.

---

## 🚀 Key Features

* Secure Authentication (JWT-based Signup/Login)
* Role-Based Access Control (Admin / Member)
* Project creation with team member assignment
* Task lifecycle management (create, assign, update status)
* Dashboard with task insights (total, completed, overdue)
* Task deletion and project deletion with cascade handling
* Clean API design with proper validation and error handling

---

## 🧠 Core Design Decisions

* **Separation of concerns**: Backend and frontend are independently structured for scalability
* **Role-based backend enforcement**: Security is handled on the server, not just UI
* **Minimal but functional UI**: Focused on usability over unnecessary design complexity
* **Data integrity**: Cascade deletion ensures no orphaned data remains

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS

**Backend**

* Node.js + Express
* MongoDB + Mongoose

**Authentication**

* JWT (stored in localStorage)

**Deployment**

* Backend: Railway
* Frontend: Vercel

---

## 📁 Project Structure

```
/server
  ├── controllers
  ├── models
  ├── routes
  ├── middleware
  └── server.js

/client
  ├── components
  ├── pages
  ├── services
  ├── context
  └── main.jsx
```

---

## ⚙️ API Overview

### 🔐 Authentication

* Register and login users
* JWT issued and verified via middleware

### 📁 Projects

* Admin can create, update, and delete projects
* Members can only view projects they are assigned to

### ✅ Tasks

* Admin can create and assign tasks
* Members can update status of assigned tasks
* Admin retains full control over all tasks

---

## 🧩 Role-Based Access Logic

| Action             | Admin | Member             |
| ------------------ | ----- | ------------------ |
| Create Project     | ✅     | ❌                  |
| Add Members        | ✅     | ❌                  |
| Create Task        | ✅     | ❌                  |
| Update Task Status | ✅     | ✅ (own tasks only) |
| Delete Task        | ✅     | Limited            |
| Delete Project     | ✅     | ❌                  |

---

## 🧪 Edge Case Handling

* Prevent unauthorized access using middleware checks
* Handle missing or invalid tokens
* Prevent task assignment to invalid users
* Cascade delete tasks when a project is removed
* Handle empty states gracefully on dashboard

---

## 🧑‍💻 Local Setup

1. Clone the repository
2. Install dependencies:

```
npm run install:all
```

3. Create `.env` file in `/server`:

```
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```

4. Start backend:

```
cd server
npm start
```

5. Start frontend:

```
cd client
npm run dev
```

---

## 🌐 Deployment

### Backend (Railway)

* Deploy only `/server`
* Set environment variables in Railway dashboard
* Start command:

```
node server.js
```

### Frontend (Vercel)

* Deploy `/client`
* Add environment variable:

```
VITE_API_URL=https://your-backend-url
```

---

## 🎥 Demo

Live URL: [Add your deployed link]
Demo Video: [Add your video link]

---

## ⚠️ Challenges Faced

* Designing secure role-based access without relying on frontend checks
* Managing relationships between users, projects, and tasks
* Handling deployment issues due to monorepo structure
* Ensuring backend and frontend communication works across environments

---

## 📈 Learnings

* Importance of backend validation for security
* Structuring scalable APIs
* Real-world debugging during deployment
* Managing state and API integration in React apps

---

## 🚀 Future Improvements

* Real-time updates using WebSockets
* Activity logs for audit tracking
* Notifications for task assignments
* Drag-and-drop task board (Kanban style)
* Pagination and filtering for large datasets

---

## 💡 Final Note

This project was built with a focus on functionality, clarity, and real-world usability under time constraints. Instead of over-engineering, the priority was to deliver a clean, working system that demonstrates strong fundamentals in full-stack development.
>>>>>>> 121092b (initial commit)
