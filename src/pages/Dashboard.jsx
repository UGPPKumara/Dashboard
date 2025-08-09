import React from 'react';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import { UserOutlined, TeamOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { employeeData, customerData } from '../data/mockData';

const { Title, Text } = Typography;

const Dashboard = () => {
  // Calculate statistics from our mock data
  const totalEmployees = employeeData.length;
  const totalCustomers = customerData.length;
  
  // For demonstration, let's pretend we have a number for today's visits
  const todaysVisits = 12;

  return (
    <div>
      <Title level={2} className="mb-4">Dashboard Overview</Title>
      
      {/* Statistic Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Employees"
              value={totalEmployees}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#003eb3' }} // blue-8
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Customers"
              value={totalCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#0958d9' }} // blue-7
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Completed Visits Today"
              value={todaysVisits}
              prefix={<CheckSquareOutlined />}
              valueStyle={{ color: '#1677ff' }} // blue-6
            />
          </Card>
        </Col>
      </Row>

      {/* You can add more sections like recent activity or charts here later */}
      <div className="mt-8">
        <Title level={4}>More Analytics Coming Soon</Title>
        <Text type="secondary">This area can be used for charts, recent activities, or important notifications.</Text>
      </div>
    </div>
  );
};

export default Dashboard;