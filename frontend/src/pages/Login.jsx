import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
          Welcome Back
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Sign in to your account
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        
        {error && (
          <div className="p-3 bg-red-100 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

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

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 mt-2 rounded-lg text-white font-semibold 
          bg-gradient-to-r from-blue-500 to-purple-500 
          hover:from-blue-600 hover:to-purple-600 
          transition duration-300 disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-5 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  </div>
);
};

export default Login;
