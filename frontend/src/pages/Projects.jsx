import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Plus } from 'lucide-react';

const Projects = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // New Project Form
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await api.post('/projects', { name });
      setShowModal(false);
      setName('');
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    }
  };

 if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      <p className="mt-3 text-gray-600">Loading projects...</p>
    </div>
  );
}

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
    
    <div className="max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Projects 📁
        </h1>

        {user.role === 'Admin' && (
          <button 
            onClick={() => setShowModal(true)}
            className="mt-4 sm:mt-0 flex items-center px-4 py-2 rounded-lg text-white 
            bg-gradient-to-r from-blue-500 to-purple-500 
            hover:from-blue-600 hover:to-purple-600 
            transition shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" /> New Project
          </button>
        )}
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
          No projects found. Create your first project 🚀
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Link 
              key={project._id} 
              to={`/projects/${project._id}`}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition 
              border border-gray-100 hover:border-blue-200 group"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                {project.name}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {project.members.length}{" "}
                {project.members.length === 1 ? "Member" : "Members"}
              </p>

              <div className="text-sm text-blue-600 font-medium">
                View Project →
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fadeIn">
          
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Create New Project 🚀
          </h2>

          <form onSubmit={handleCreateProject}>
            
            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                required
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Website Redesign"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-white 
                bg-gradient-to-r from-blue-500 to-purple-500 
                hover:from-blue-600 hover:to-purple-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
};

export default Projects;
