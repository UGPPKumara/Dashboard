import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customerData, visitsData, employeeData } from '../data/mockData';
import { Card, Descriptions, Typography, Button, Table, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const customer = customerData.find(c => c.id === customerId);
  const customerVisits = visitsData
    .filter(v => v.customerId === customerId)
    .map(visit => {
      const employee = employeeData.find(e => e.id === visit.employeeId);
      return { ...visit, employeeName: employee ? employee.name : 'Unknown' };
    });

  if (!customer) {
    return <div>Customer not found.</div>;
  }
  
  const visitColumns = [
    { title: 'Visit Date', dataIndex: 'visitDate', key: 'visitDate', render: (date) => new Date(date).toLocaleString() },
    { title: 'Visited By', dataIndex: 'employeeName', key: 'employeeName' },
    { title: 'Attendance', dataIndex: 'attendanceMethod', key: 'attendanceMethod', render: (text) => <Tag color="cyan">{text}</Tag> },
    { title: 'Next Visit', dataIndex: 'nextVisitDate', key: 'nextVisitDate' },
  ];

  return (
    <div>
      <Button onClick={() => navigate('/customers')} icon={<ArrowLeftOutlined />} className="mb-4">
        Back to All Customers
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Customer Information" className="md:col-span-1">
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
            <Descriptions.Item label="Contact">{customer.contact}</Descriptions.Item>
            <Descriptions.Item label="Address">{customer.address}</Descriptions.Item>
            <Descriptions.Item label="Registered By">{customer.registeredBy}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Registration Location" className="md:col-span-2">
          <iframe
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${customer.location.lat},${customer.location.lng}&key=YOUR_API_KEY`}>
          </iframe>
          <p className="text-xs text-slate-400 mt-2">Note: This is a map simulation. A Google Maps API key is required for it to work.</p>
        </Card>
      </div>

      <Card title="Visit History" className="mt-6">
        <Table columns={visitColumns} dataSource={customerVisits} rowKey="visitId" />
      </Card>
    </div>
  );
};

export default CustomerDetails;