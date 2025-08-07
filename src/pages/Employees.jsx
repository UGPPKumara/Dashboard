import React from 'react';
import { Table, Tag, Space, Typography } from 'antd';
import { employeeData } from '../data/mockData'; // Import our mock data

const { Title } = Typography;

// This function determines the color of the status tag
const getStatusColor = (status) => {
  switch (status) {
    case 'Present':
      return 'green';
    case 'Absent':
      return 'red';
    case 'On Leave':
      return 'blue';
    default:
      return 'default';
  }
};

const Employees = () => {
  // Define the columns for our table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // We can make the name a clickable link in the future
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Recent Attendance',
      key: 'attendance',
      dataIndex: 'attendance',
      // 'render' allows us to create custom display for the data
      render: (attendance) => (
        <Space wrap>
          {attendance.map((record) => (
            <Tag color={getStatusColor(record.status)} key={record.date}>
              {`${record.date}: ${record.status}`}
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Employee Monitoring</Title>
      <p className="mb-4">View employee details and their attendance records.</p>
      <Table
        columns={columns}
        dataSource={employeeData}
        rowKey="id" // Use the unique 'id' for each row
        bordered
      />
    </div>
  );
};

export default Employees;