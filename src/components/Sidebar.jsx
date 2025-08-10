import React from 'react';
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  SolutionOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/LogoDrak.png';
import logoSmall from '../assets/Icon Logo Dark.png';

// Sub-component for individual menu items to keep the code clean
const NavLink = ({ to, icon, label, collapsed, isActive }) => {
  const navigate = useNavigate();
  const activeClasses = isActive ? 'bg-blue-6 text-white' : 'text-slate-400 hover:bg-blue-8 hover:text-white';
  
  return (
    <li className="mb-2">
      <a
        onClick={() => navigate(to)}
        className={`flex items-center p-3 rounded-md cursor-pointer transition-colors duration-200 ${activeClasses}`}
      >
        <span className="text-xl">{icon}</span>
        {!collapsed && <span className="ml-4 font-medium">{label}</span>}
      </a>
    </li>
  );
};

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
    { to: '/employees', icon: <TeamOutlined />, label: 'Employees' },
    { to: '/customers', icon: <UserOutlined />, label: 'Customers' },
    { to: '/departments', icon: <SolutionOutlined />, label: 'Departments' },
    { to: '/positions', icon: <IdcardOutlined />, label: 'Positions' },
  ];

  return (
    <div className="flex flex-col h-full text-white p-2">
      <div className="h-16 flex items-center justify-center mb-4">
        {collapsed ? (
          <img src={logoSmall} alt="Small Logo" className="h-8 w-auto" />
        ) : (
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        )}
      </div>

      <nav>
        <ul>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              {...item}
              collapsed={collapsed}
              isActive={location.pathname === item.to}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;