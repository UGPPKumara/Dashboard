import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Typography, Button, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const { Title } = Typography;

const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
        const docRef = doc(db, 'customers', customerId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setCustomer({ id: docSnap.id, ...docSnap.data() });
        } else {
            console.log("No such customer!");
        }
        setLoading(false);
    };

    fetchCustomer();
  }, [customerId]);

  if (loading) {
    return <div className="text-center p-10"><Spin size="large" /></div>;
  }

  if (!customer) {
    return <div>Customer not found.</div>;
  }
  
  // *** MAP URL IS CORRECTED HERE ***
  const apiKey = "YOUR_Maps_API_KEY"; // IMPORTANT: Replace with your key
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${customer.location.latitude},${customer.location.longitude}`;

  return (
    <div>
      <Button onClick={() => navigate('/customers')} icon={<ArrowLeftOutlined />} className="mb-4">
        Back to All Customers
      </Button>
      
      <Title level={3}>{`${customer.firstName} ${customer.lastName}`}</Title>

      <Card>
        <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Full Name">{`${customer.firstName} ${customer.lastName}`}</Descriptions.Item>
            <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
            <Descriptions.Item label="Address">{customer.address}</Descriptions.Item>
            <Descriptions.Item label="First Visit Date">
                {customer.firstVisitDate ? new Date(customer.firstVisitDate.seconds * 1000).toLocaleDateString() : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Next Visit Date">
                {customer.nextVisitDate ? new Date(customer.nextVisitDate.seconds * 1000).toLocaleDateString() : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Note">{customer.note}</Descriptions.Item>
        </Descriptions>
      </Card>

      {customer.location && (
        <Card title="Registration Location" className="mt-6">
            <iframe
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapUrl}>
            </iframe>
        </Card>
      )}
    </div>
  );
};

export default CustomerDetails;