import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, Typography, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const { Title } = Typography;
const { TextArea } = Input;

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [form] = Form.useForm();
  const positionsCollectionRef = collection(db, 'positions');

  useEffect(() => {
    const unsubscribe = onSnapshot(positionsCollectionRef, (snapshot) => {
      const positionsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPositions(positionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const showAddModal = () => {
    setEditingPosition(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (position) => {
    setEditingPosition(position);
    form.setFieldsValue(position);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingPosition(null);
  };

  const handleDelete = (positionId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this position?',
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk: async () => {
        try {
          const positionDoc = doc(db, 'positions', positionId);
          await deleteDoc(positionDoc);
          message.success('Position deleted successfully');
        } catch (error) {
          message.error('Failed to delete position.');
        }
      },
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingPosition) {
        const positionDoc = doc(db, 'positions', editingPosition.id);
        await updateDoc(positionDoc, values);
        message.success('Position updated successfully!');
      } else {
        await addDoc(positionsCollectionRef, values);
        message.success('Position added successfully!');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  const columns = [
    { title: 'Position Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Roles', dataIndex: 'roles', key: 'roles' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>Edit</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Title level={2} className="!mb-0">Position Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Add Position
        </Button>
      </div>
      <Table columns={columns} dataSource={positions} rowKey="id" loading={loading} bordered />
      <Modal
        title={editingPosition ? 'Edit Position' : 'Add New Position'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="name" label="Position Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="roles" label="Roles">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingPosition ? 'Save Changes' : 'Create Position'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Positions;