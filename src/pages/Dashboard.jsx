import React from 'react';
import { Card, Col, Row, Statistic, Typography, Table } from 'antd';
import { UserOutlined, TeamOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { employeeData, customerData, visitsData } from '../data/mockData';

const { Title } = Typography;

const Dashboard = () => {
  const totalEmployees = employeeData.length;
  const totalCustomers = customerData.length;
  const todaysVisits = visitsData.filter(v => new Date(v.visitDate).toDateString() === new Date().toDateString()).length;

  const recentVisits = visitsData
    .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))
    .slice(0, 5)
    .map(visit => ({
      ...visit,
      employeeName: employeeData.find(e => e.id === visit.employeeId)?.name,
      customerName: customerData.find(c => c.id === visit.customerId)?.name,
    }));

  const visitColumns = [
    { title: 'Employee', dataIndex: 'employeeName', key: 'employeeName' },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Time', dataIndex: 'visitDate', key: 'visitDate', render: (date) => new Date(date).toLocaleTimeString() },
  ];

  return (
    <div>
      <Title level={2} className="mb-4">Dashboard Overview</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic title="Total Employees" value={totalEmployees} prefix={<TeamOutlined />} valueStyle={{ color: '#003eb3' }}/>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic title="Total Customers" value={totalCustomers} prefix={<UserOutlined />} valueStyle={{ color: '#0958d9' }}/>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic title="Completed Visits Today" value={todaysVisits} prefix={<CheckSquareOutlined />} valueStyle={{ color: '#1677ff' }}/>
          </Card>
        </Col>
      </Row>
      <Card title="Recent Visit Activity" className="mt-6">
        <Table columns={visitColumns} dataSource={recentVisits} rowKey="visitId" pagination={false}/>
      </Card>
    </div>
  );
};

export default Dashboard;