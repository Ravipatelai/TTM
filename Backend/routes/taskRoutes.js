const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTaskStatus, getDashboardStats } = require('../controllers/taskController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getTasks)
  .post(protect, admin, createTask);

router.get('/stats', protect, getDashboardStats);

router.route('/:id')
  .put(protect, updateTaskStatus);

module.exports = router;
