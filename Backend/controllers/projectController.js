const Project = require('../models/Project');

const createProject = async (req, res, next) => {
  try {
    const { name, members } = req.body;

    if (!name) {
      res.status(400);
      throw new Error('Please provide a project name');
    }

    const projectMembers = members ? [...members] : [];
    if (!projectMembers.includes(req.user._id.toString())) {
      projectMembers.push(req.user._id);
    }

    const project = await Project.create({
      name,
      createdBy: req.user._id,
      members: projectMembers,
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    let projects;
    
    // Admins can see projects they created or are a part of, maybe all?
    // Let's say Admins see all projects they created or are in. 
    // Wait, simple rule: If Admin, see all. If member, see where they are in members.
    if (req.user.role === 'Admin') {
      projects = await Project.find({}).populate('members', 'name email');
    } else {
      projects = await Project.find({ members: req.user._id }).populate('members', 'name email');
    }

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('members', 'name email');
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject, getProjects, getProjectById };
