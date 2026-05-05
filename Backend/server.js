const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Connect to database
// connectDB();

// ========== CORS FIX (CORRECTED) ==========
// Apply CORS middleware for all routes
app.use(cors({
  origin: 'https://team-task-manager-abkz.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// REMOVED the problematic app.options('*', ...) line
// The cors() middleware above already handles OPTIONS preflight requests
// ========== END CORS FIX ==========

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Serve frontend (For production/Railway)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) =>  // Changed from /.*/ to * for Express
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'dist', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const serverconnect = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      console.log(`CORS enabled for: https://team-task-manager-abkz.vercel.app`);
    });
  } catch (error) {
    console.error('Server connection error:', error);
  }
}

serverconnect();