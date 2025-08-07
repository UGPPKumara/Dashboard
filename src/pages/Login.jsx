import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Modal, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // <-- Import your logo

const { Title, Text, Link } = Typography;

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const isLoggedIn = login(values.email, values.password);
    if (isLoggedIn) {
      navigate('/');
    }
  };

  // --- Forgot Password Logic ---
  const showForgotPasswordModal = () => {
    setIsModalVisible(true);
  };

  const handleForgotPassword = (values) => {
    console.log('Password reset requested for:', values.email);
    // In a real app, you would make an API call here to send a reset email.
    // For now, we'll just simulate it.
    message.success('If an account exists, a password reset link has been sent to your email.');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // -----------------------------


  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-lg p-4">
        <div className="text-center mb-8">
          <img src={logo} alt="Company Logo" className="h-16 w-auto mx-auto mb-4" />
          <Title level={4} className="text-slate-600">Employee Management System</Title>
          <Text className="text-slate-500 text-[20px] ">Admin Login</Text>
        </div>
        
        <Form
          name="admin_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'The input is not a valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end">
                <Link onClick={showForgotPasswordModal}>
                    Forgot Password?
                </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full bg-lime-500 hover:bg-lime-600 border-none"
                size="large"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Forgot Password Modal */}
      <Modal
        title="Reset Password"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleForgotPassword} layout="vertical">
          <p className="mb-4 text-slate-500">Enter your email address and we will send you a link to reset your password.</p>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: 'email', message: 'Please enter a valid email!' },
              { required: true, message: 'Email is required!' }
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-lime-500 hover:bg-lime-600 border-none">
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;