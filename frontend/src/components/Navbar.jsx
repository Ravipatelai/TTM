import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, FolderKanban } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center text-xl font-bold text-slate-800">
              <span className="bg-red-900 text-white p-1 rounded-md mr-2">TTM</span>
              Team Task Manager
            </Link>
            
            {user && (
              <div className="hidden md:flex space-x-4">
                <Link to="/" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <LayoutDashboard className="w-4 h-4 mr-1" /> Dashboard
                </Link>
                <Link to="/projects" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FolderKanban className="w-4 h-4 mr-1" /> Projects
                </Link>
              </div>
            )}
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-500">
                Hello, <strong>{user.name}</strong> ({user.role})
              </span>
            <button
  onClick={handleLogout}
  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white 
  bg-gradient-to-r from-red-500 to-pink-500 
  hover:from-red-600 hover:to-pink-600 
  transition duration-300 shadow-md"
>
  <LogOut className="w-4 h-4" />
  Logout
</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
