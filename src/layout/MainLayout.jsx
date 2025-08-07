import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Create a new handler for logout
  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigate from here
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
          onClick: handleLogout, // Use the new handler
        },
      ]}
    />
  );

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-white text-2xl h-16 flex items-center justify-center font-bold bg-gray-800">
          Logo
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => navigate(key)}
          items={[
            { key: '/', icon: <BarChartOutlined />, label: 'Dashboard' },
            { key: '/employees', icon: <TeamOutlined />, label: 'Employees' },
            { key: '/customers', icon: <UserOutlined />, label: 'Customers' },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="p-0 bg-white flex items-center justify-between px-6">
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
        </Header>
        <Content className="m-6 p-6 bg-white rounded-lg overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;