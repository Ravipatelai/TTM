import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { CheckCircle, Clock, ListTodo } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({ total: 0, completed: 0, overdue: 0 });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [statsRes, tasksRes] = await Promise.all([
        api.get('/tasks/stats'),
        api.get('/tasks')
      ]);

      setStats(statsRes.data || { total: 0, completed: 0, overdue: 0 });

      let tasksData = [];

      if (Array.isArray(tasksRes.data)) {
        tasksData = tasksRes.data;
      } else if (Array.isArray(tasksRes.data.tasks)) {
        tasksData = tasksRes.data.tasks;
      }

      setRecentTasks(tasksData.slice(0, 6)); // show more cards

    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      setRecentTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Dashboard 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1 sm:mt-0">
          Welcome back, <strong>{user?.name}</strong>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

        {/* Total */}
        <div className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <ListTodo className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Tasks</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 mr-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Completed</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Overdue</p>
              <p className="text-2xl font-bold">{stats.overdue}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Tasks Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
          Recent Tasks
        </h2>
      </div>

      {/* Tasks */}
      {recentTasks.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center text-slate-500">
          🚀 No tasks yet. Start by creating one!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onTaskUpdate={fetchDashboardData}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Dashboard;