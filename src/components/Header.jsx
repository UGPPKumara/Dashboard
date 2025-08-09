import React, { useState, useEffect, useRef } from 'react';
import {
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined, // <-- Import Bell icon
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notificationData } from '../data/mockData'; // Import notification data

const Header = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // State for each dropdown
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  
  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  
  // Calculate unread count
  const unreadCount = notificationData.filter(item => !item.read).length;

  // Effect to update the time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Effect to close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setIsNotificationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white flex items-center justify-between px-4 sm:px-6 h-16 shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-500 hover:text-blue-6 focus:outline-none"
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'text-2xl',
          })}
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-blue-9">Employee Management System</h1>
          <p className="text-xs sm:text-sm text-slate-500">Welcome back, {user ? user.name : 'Admin'}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <div className="text-right hidden sm:block">
          <p className="font-semibold text-slate-700 text-sm">{currentTime.toLocaleTimeString()}</p>
          <p className="text-xs text-slate-500">{currentTime.toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
        </div>

        {/* Notification Dropdown */}
        <div className="relative" ref={notificationDropdownRef}>
          <button
            onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
            className="relative text-slate-500 hover:text-blue-6 focus:outline-none"
          >
            <BellOutlined className="text-2xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-white text-xs justify-center items-center">
                  {unreadCount}
                </span>
              </span>
            )}
          </button>
          
          {isNotificationDropdownOpen && (
             <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5">
               <div className="p-3 border-b font-semibold text-slate-700">Notifications</div>
               <ul>
                 {notificationData.map(item => (
                   <li key={item.id} className={`border-b last:border-b-0 ${!item.read ? 'bg-blue-50' : ''}`}>
                     <a href="#" className="block p-3 hover:bg-slate-100">
                       <p className={`font-medium text-sm text-slate-800 ${!item.read ? 'font-bold' : ''}`}>{item.title}</p>
                       <p className="text-xs text-slate-500">{item.description}</p>
                     </a>
                   </li>
                 ))}
               </ul>
               <div className="p-2 text-center">
                 <a href="#" className="text-sm text-blue-6 hover:underline">View All Notifications</a>
               </div>
             </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-5"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-2 rounded-full flex items-center justify-center">
              <UserOutlined className="text-blue-7 text-lg sm:text-xl" />
            </div>
          </button>
          
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
              <a onClick={() => { navigate('/profile'); setIsUserDropdownOpen(false); }} className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer">
                <UserOutlined className="mr-3" />
                Profile
              </a>
              <a onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer">
                <LogoutOutlined className="mr-3" />
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;