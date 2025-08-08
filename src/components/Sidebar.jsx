import React from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../assets//LogoDrak.png';
import logoSmall from '../assets/Icon Logo Dark.png'; // <-- Import the new small logo

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-16 flex items-center justify-center">
        {/* Conditionally render the correct logo */}
        {collapsed ? (
          <img src={logoSmall} alt="Small Logo" className="h-8 w-auto" />
        ) : (
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
        onClick={({ key }) => navigate(key)}
        items={[
          { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
          { key: '/employees', icon: <TeamOutlined />, label: 'Employees' },
          { key: '/customers', icon: <UserOutlined />, label: 'Customers' },
        ]}
      />

      
    </>
  );
};

export default Sidebar;