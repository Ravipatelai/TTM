const Task = require('../models/Task');

const createTask = async (req, res, next) => {
  try {
    const { title, description, projectId, assignedTo, deadline } = req.body;

    if (!title || !projectId || !assignedTo || !deadline) {
      res.status(400);
      throw new Error('Please fill all required fields');
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      deadline,
    });

    const populatedTask = await Task.findById(task._id)
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name');

    res.status(201).json(populatedTask);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { projectId } = req.query;
    let query = {};
    
    if (projectId) {
      query.projectId = projectId;
    }

    if (req.user.role !== 'Admin') {
      query.assignedTo = req.user._id;
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Members can only update their own tasks
    if (req.user.role !== 'Admin' && task.assignedTo.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this task');
    }

    task.status = req.body.status || task.status;
    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role !== 'Admin') {
      query.assignedTo = req.user._id;
    }

    const tasks = await Task.find(query);
    
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Done').length;
    const overdue = tasks.filter(t => t.status !== 'Done' && new Date(t.deadline) < new Date()).length;

    res.status(200).json({ total, completed, overdue });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, updateTaskStatus, getDashboardStats };
