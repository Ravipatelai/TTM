import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, FolderKanban, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center text-lg sm:text-xl font-bold text-slate-800">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-lg mr-2">
              TTM
            </span>
            Team Task Manager
          </Link>

          {/* Desktop Menu */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              
              <Link
                to="/"
                className="flex items-center text-slate-600 hover:text-blue-600 text-sm font-medium transition"
              >
                <LayoutDashboard className="w-4 h-4 mr-1" />
                Dashboard
              </Link>

              <Link
                to="/projects"
                className="flex items-center text-slate-600 hover:text-blue-600 text-sm font-medium transition"
              >
                <FolderKanban className="w-4 h-4 mr-1" />
                Projects
              </Link>

              <span className="text-sm text-slate-500 hidden lg:block">
                Hi, <strong>{user.name}</strong> ({user.role})
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center text-slate-600 hover:text-red-600 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {user && (
            <button
              className="md:hidden text-slate-700"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && user && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3 shadow-sm">
          
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center text-slate-600 hover:text-blue-600"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Link>

          <Link
            to="/projects"
            onClick={() => setOpen(false)}
            className="flex items-center text-slate-600 hover:text-blue-600"
          >
            <FolderKanban className="w-4 h-4 mr-2" />
            Projects
          </Link>

          <div className="text-sm text-slate-500">
            Hi, <strong>{user.name}</strong> ({user.role})
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 mt-2"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;