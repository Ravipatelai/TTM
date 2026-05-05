# Team Task Manager

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
