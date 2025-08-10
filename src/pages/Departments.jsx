import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, Typography, message, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [form] = Form.useForm();
  const departmentsCollectionRef = collection(db, 'departments');

  useEffect(() => {
    const unsubscribe = onSnapshot(departmentsCollectionRef, (snapshot) => {
      const departmentsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDepartments(departmentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const showAddModal = () => {
    setEditingDepartment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (department) => {
    setEditingDepartment(department);
    // Convert timestamp to Day.js object for the form
    const formValues = {
      ...department,
      startDate: department.startDate ? dayjs(department.startDate.toDate()) : null,
    };
    form.setFieldsValue(formValues);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingDepartment(null);
  };

  const handleDelete = (departmentId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this department?',
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk: async () => {
        try {
          const departmentDoc = doc(db, 'departments', departmentId);
          await deleteDoc(departmentDoc);
          message.success('Department deleted successfully');
        } catch (error) {
          message.error('Failed to delete department.');
        }
      },
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingDepartment) {
        const departmentDoc = doc(db, 'departments', editingDepartment.id);
        await updateDoc(departmentDoc, values);
        message.success('Department updated successfully!');
      } else {
        await addDoc(departmentsCollectionRef, values);
        message.success('Department added successfully!');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  const columns = [
    { title: 'Department Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', render: (date) => date ? new Date(date.seconds * 1000).toLocaleDateString() : 'N/A' },
    { title: 'Info', dataIndex: 'info', key: 'info' },
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
        <Title level={2} className="!mb-0">Department Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Add Department
        </Button>
      </div>
      <Table columns={columns} dataSource={departments} rowKey="id" loading={loading} bordered />
      <Modal
        title={editingDepartment ? 'Edit Department' : 'Add New Department'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="name" label="Department Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="startDate" label="Start Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="info" label="Info">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingDepartment ? 'Save Changes' : 'Create Department'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Departments;