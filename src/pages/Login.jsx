import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const { Title, Text, Link } = Typography;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Hook to control the form

  const onFinish = (values) => {
    // Manually trigger validation before attempting to log in
    form.validateFields()
      .then(values => {
        const isLoggedIn = login(values.email, values.password);
        if (isLoggedIn) {
          navigate('/');
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
        message.error('Please fill in all required fields.');
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-1 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-lg p-4">
        <div className="text-center mb-8">
          <img src={logo} alt="Company Logo" className="h-16 w-auto mx-auto mb-4" />
          <Title level={4} className="text-blue-9">Employee Management System</Title>
          <Text className="text-slate-500">Admin Login</Text>
        </div>
        
        <Form
          form={form} // Attach form instance
          name="admin_login"
          onFinish={onFinish}
          autoComplete="off"
          // Prevent validation while typing
          validateTrigger=""
        >
          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'The input is not a valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email (admin@fieldops.com)" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password (password)" size="large" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end">
                {/* Updated Link to navigate to the new page */}
                <Link onClick={() => navigate('/forgot-password')}>Forgot Password?</Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button 
                type="gradient"

                htmlType="submit" 
                className="w-full bg-blue-9 text-white"
                size="large"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;