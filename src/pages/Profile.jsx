import React from 'react';
import { Card, Avatar, Typography, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const Profile = () => {
  const { user } = useAuth(); // Get user data from context

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <Avatar size={100} icon={<UserOutlined />} className="mb-4" />
        <Title level={2}>{user.name}</Title>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <Descriptions title="User Information" bordered className="mt-8">
        <Descriptions.Item label="Full Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Role">Administrator</Descriptions.Item>
        <Descriptions.Item label="Status">Active</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Profile;