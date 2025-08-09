import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeeData, customerData, visitsData } from '../data/mockData';
import { Card, Descriptions, Typography, Tabs, Table, Tag, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AttendanceTab = ({ attendance }) => {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'Present' ? 'green' : status === 'Absent' ? 'red' : 'blue';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];
  return <Table columns={columns} dataSource={attendance} rowKey="date" pagination={false} />;
};

const CustomersTab = ({ customers }) => {
  const columns = [
    { title: 'Customer Name', dataIndex: 'name', key: 'name' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];
  return <Table columns={columns} dataSource={customers} rowKey="id" pagination={false} />;
};

const VisitsTab = ({ visits }) => {
  const columns = [
    { title: 'Visit Date', dataIndex: 'visitDate', key: 'visitDate', render: (date) => new Date(date).toLocaleString() },
    { 
      title: 'Customer', 
      dataIndex: 'customerId', 
      key: 'customerId', 
      render: (id) => customerData.find(c => c.id === id)?.name || 'Unknown' 
    },
    { 
      title: 'Location', 
      key: 'location', 
      render: (_, record) => (
        <a 
          href={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${record.location.lat},${record.location.lng}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View on Map
        </a>
      )
    },
  ];
  return <Table columns={columns} dataSource={visits} rowKey="visitId" pagination={false} />;
};

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  
  const employee = employeeData.find(emp => emp.id === employeeId);
  const assignedCustomers = customerData.filter(cust => cust.registeredBy === employee?.name);
  const employeeVisits = visitsData.filter(v => v.employeeId === employee?.id);

  if (!employee) {
    return (
      <div className="text-center">
        <Title level={3}>Employee Not Found</Title>
        <Button onClick={() => navigate('/employees')}>Back to Employee List</Button>
      </div>
    );
  }

  const items = [
    { key: '1', label: 'Attendance Records', children: <AttendanceTab attendance={employee.attendance} /> },
    { key: '2', label: 'Assigned Customers', children: <CustomersTab customers={assignedCustomers} /> },
    { key: '3', label: 'Visit History', children: <VisitsTab visits={employeeVisits} /> },
  ];

  return (
    <div>
      <Button onClick={() => navigate('/employees')} icon={<ArrowLeftOutlined />} className="mb-4">
        Back to All Employees
      </Button>
      <Card className="mb-6">
        <Title level={3} className="!mt-0">{employee.name}</Title>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Position">{employee.position}</Descriptions.Item>
          <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
          <Descriptions.Item label="Username">{employee.username}</Descriptions.Item>
        </Descriptions>
      </Card>
      
      <Card>
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </div>
  );
};

export default EmployeeDetails;