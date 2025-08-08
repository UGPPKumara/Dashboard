import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const { Title, Text, Link } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForgotPassword = (values) => {
    console.log('Password reset requested for:', values.email);
    message.success('If an account with that email exists, a reset link has been sent.');
    navigate('/login'); // Redirect back to login page after submission
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-1 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-lg p-4">
        <div className="text-center mb-8">
          <img src={logo} alt="Company Logo" className="h-16 w-auto mx-auto mb-4" />
          <Title level={4} className="text-blue-9">Reset Your Password</Title>
        </div>
        
        <Form onFinish={handleForgotPassword} layout="vertical" autoComplete="off">
          <Text type="secondary" className="block text-center mb-6">
            Enter your email address and we will send you a link to reset your password.
          </Text>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { type: 'email', message: 'Please enter a valid email!' },
              { required: true, message: 'Email is required to reset your password!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="you@example.com" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" size="large">
              Send Reset Link
            </Button>
          </Form.Item>
          <div className="text-center">
            <Link onClick={() => navigate('/login')}>
              <ArrowLeftOutlined /> Back to Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;