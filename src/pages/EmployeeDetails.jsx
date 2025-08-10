import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Typography, Tabs, Table, Tag, Button, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

const { Title } = Typography;

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  
  const [employee, setEmployee] = useState(null);
  const [assignedCustomers, setAssignedCustomers] = useState([]);
  const [employeeVisits, setEmployeeVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      // Fetch employee details
      const employeeDocRef = doc(db, 'employees', employeeId);
      const employeeSnap = await getDoc(employeeDocRef);

      if (employeeSnap.exists()) {
        const employeeData = { id: employeeSnap.id, ...employeeSnap.data() };
        setEmployee(employeeData);

        // Fetch assigned customers
        const customersCollectionRef = collection(db, 'customers');
        const customerQuery = query(customersCollectionRef, where("registeredById", "==", employeeId));
        const customerSnap = await getDocs(customerQuery);
        setAssignedCustomers(customerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Fetch visit history
        const visitsCollectionRef = collection(db, 'visits');
        const visitQuery = query(visitsCollectionRef, where("employeeId", "==", employeeId));
        const visitSnap = await getDocs(visitQuery);
        setEmployeeVisits(visitSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchEmployeeData();
  }, [employeeId]);

  if (loading) {
    return <div className="text-center p-10"><Spin size="large" /></div>;
  }

  if (!employee) {
    return (
      <div className="text-center">
        <Title level={3}>Employee Not Found</Title>
        <Button onClick={() => navigate('/employees')}>Back to Employee List</Button>
      </div>
    );
  }

  const items = [
    { key: '1', label: 'Assigned Customers', children: <CustomersTab customers={assignedCustomers} /> },
    { key: '2', label: 'Visit History', children: <VisitsTab visits={employeeVisits} /> },
  ];

  return (
    <div>
      <Button onClick={() => navigate('/employees')} icon={<ArrowLeftOutlined />} className="mb-4">
        Back to All Employees
      </Button>
      <Card className="mb-6">
        <Title level={3} className="!mt-0">{employee.name}</Title>
        <Descriptions bordered column={1} size="small">
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

const CustomersTab = ({ customers }) => {
  const columns = [
    { title: 'Customer Name', dataIndex: 'name', key: 'name' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];
  return <Table columns={columns} dataSource={customers} rowKey="id" pagination={{ pageSize: 5 }} />;
};

const VisitsTab = ({ visits }) => {
  const columns = [
    { title: 'Visit Date', dataIndex: 'visitDate', key: 'visitDate', render: (date) => new Date(date.seconds * 1000).toLocaleString() },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { 
      title: 'Location', 
      key: 'location', 
      render: (_, record) => (
        <a 
          href={`http://www.google.com/maps/place/${record.location.lat},${record.location.lng}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View on Map
        </a>
      )
    },
  ];
  return <Table columns={columns} dataSource={visits} rowKey="id" pagination={{ pageSize: 5 }} />;
};

export default EmployeeDetails;