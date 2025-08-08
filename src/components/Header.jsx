import React from 'react';
import { Layout, Avatar, Dropdown, Space, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header: AntHeader } = Layout;

const Header = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dropdownMenu = (
    <Menu
      items={[
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: 'Profile',
          onClick: () => navigate('/profile'),
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Logout',
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <AntHeader className="p-0 bg-white flex items-center justify-between px-6">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'text-lg cursor-pointer',
        onClick: () => setCollapsed(!collapsed),
      })}
      <Dropdown overlay={dropdownMenu} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar icon={<UserOutlined />} />
            <span>{user ? user.name : 'Admin'}</span>
          </Space>
        </a>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;