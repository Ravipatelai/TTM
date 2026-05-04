import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await signup(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
    
    <div className="w-full max-w-md sm:max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
      
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Create Account 
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Join Team Task Manager
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        
        {error && (
          <div className="p-3 bg-red-100 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            required
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 mt-2 rounded-lg text-white font-semibold 
          bg-gradient-to-r from-blue-500 to-purple-500 
          hover:from-blue-600 hover:to-purple-600 
          transition duration-300 disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-5 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  </div>
);
};

export default Signup;
