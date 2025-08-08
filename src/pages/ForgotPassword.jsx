import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ErrorCard from '../components/ErrorCard'; // <-- Import the ErrorCard component

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-hide the error message after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validate = () => {
    if (!email) {
      setError('Please enter your email address.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (validate()) {
      console.log('Password reset requested for:', email);
      // In a real app, you would make an API call here.
      setIsSubmitted(true);
    }
  };

  return (
    <>
      <ErrorCard message={error} onClose={() => setError('')} />
      <div className="flex justify-center items-center min-h-screen bg-blue-1 p-4 font-sans">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
          <div className="text-center mb-8">
            <img src={logo} alt="Company Logo" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-blue-9">Reset Your Password</h1>
          </div>

          {isSubmitted ? (
            <div className="text-center">
              <p className="text-slate-600 mb-4">If an account with that email exists, a password reset link has been sent.</p>
              <a onClick={() => navigate('/login')} className="text-sm text-blue-6 hover:underline cursor-pointer">
                <ArrowLeftOutlined /> Back to Login
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="text-slate-500 text-center mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MailOutlined className="text-slate-400" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-5 focus:border-blue-5 border-slate-300"
                  />
                </div>
                {/* We no longer need the inline error message here */}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-6 hover:bg-blue-5 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-5"
                >
                  Send Reset Link
                </button>
              </div>
              <div className="text-center mt-4">
                <a onClick={() => navigate('/login')} className="text-sm text-blue-6 hover:underline cursor-pointer">
                  <ArrowLeftOutlined /> Back to Login
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;