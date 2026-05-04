import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { Plus, ArrowLeft } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '', description: '', assignedTo: '', deadline: ''
  });
  const [error, setError] = useState('');

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const [projRes, tasksRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/tasks?projectId=${id}`)
      ]);
      setProject(projRes.data);
      setTasks(tasksRes.data);
      
      if (user.role === 'Admin') {
        const usersRes = await api.get('/auth/users');
        setUsers(usersRes.data);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await api.post('/tasks', { ...taskForm, projectId: id });
      setShowTaskModal(false);
      setTaskForm({ title: '', description: '', assignedTo: '', deadline: '' });
      fetchProjectDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  if (loading) return <div className="flex justify-center mt-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  if (!project) return <div className="text-center mt-10">Project not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/projects" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Projects
      </Link>

      <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{project.name}</h1>
          <p className="text-slate-500 mt-2 text-sm">Created on {new Date(project.createdAt).toLocaleDateString()}</p>
        </div>
        {user.role === 'Admin' && (
          <button 
            onClick={() => setShowTaskModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Task
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center text-slate-500">
          No tasks found for this project.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <TaskCard key={task._id} task={task} onTaskUpdate={fetchProjectDetails} />
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text" required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  value={taskForm.title} onChange={e => setTaskForm({...taskForm, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-300 rounded-md" rows="3"
                  value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign To</label>
                <select
                  required className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  value={taskForm.assignedTo} onChange={e => setTaskForm({...taskForm, assignedTo: e.target.value})}
                >
                  <option value="">Select a user...</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
                <input
                  type="date" required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  value={taskForm.deadline} onChange={e => setTaskForm({...taskForm, deadline: e.target.value})}
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4">
                <button type="button" onClick={() => setShowTaskModal(false)} className="px-4 py-2 text-sm text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
