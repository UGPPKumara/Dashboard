import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CloseOutlined,
  EyeOutlined, // <-- Import Eye icon
  EyeInvisibleOutlined, // <-- Import Eye Invisible icon
} from '@ant-design/icons';
import ErrorCard from '../components/ErrorCard';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // <-- State for password visibility

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (role !== 'admin') {
      setError('Only Admin users can log in.');
      return;
    }

    const loginResult = login(email, password);
    if (loginResult === true) {
      navigate('/');
    } else {
      setError(loginResult);
    }
  };

  return (
    <>
      <ErrorCard message={error} onClose={() => setError('')} />
      <div className="flex justify-center items-center min-h-screen bg-blue-1 p-4 font-sans">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
          <div className="text-center mb-8">
            <img src={logo} alt="Company Logo" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-blue-9">Employee Management System</h1>
          </div>
          
          <form onSubmit={handleSubmit} noValidate>
            {/* Role Dropdown */}
            <div className="mb-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserOutlined className="text-slate-400" />
                </span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-5 focus:border-blue-5 border-slate-300 appearance-none"
                >
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MailOutlined className="text-slate-400" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (admin@nuvoora.com)"
                  className="w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-5 focus:border-blue-5 border-slate-300"
                />
              </div>
            </div>

            {/* Password Field with Visibility Toggle */}
            <div className="mb-6">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockOutlined className="text-slate-400" />
                </span>
                <input
                  type={isPasswordVisible ? 'text' : 'password'} // <-- Dynamically change type
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (password)"
                  className="w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-5 focus:border-blue-5 border-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-slate-400 hover:text-slate-600"
                >
                  {isPasswordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <a href="/forgot-password" className="text-sm text-blue-6 hover:underline">
                Forgot Password?
              </a>
            </div>

            <div>
              <button 
                type="submit"
                className="w-full bg-blue-6 hover:bg-blue-5 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-5"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;