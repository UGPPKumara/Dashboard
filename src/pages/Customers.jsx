import React from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { customerData } from '../data/mockData';
import { EyeOutlined } from '@ant-design/icons';

const Customers = () => {
    const navigate = useNavigate();

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Contact', dataIndex: 'contact', key: 'contact' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Registered By', dataIndex: 'registeredBy', key: 'registeredBy' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button icon={<EyeOutlined />} onClick={() => navigate(`/customers/${record.id}`)}>
                    View Details
                </Button>
            ),
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Customer Database</h1>
            <Table columns={columns} dataSource={customerData} rowKey="id" />
        </div>
    );
};

export default Customers;