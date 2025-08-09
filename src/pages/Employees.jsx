import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Typography,
  message,
} from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { employeeData as initialEmployeeData } from '../data/mockData';
import ErrorCard from '../components/ErrorCard';

const { Title } = Typography;
const { Search } = Input;

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployeeData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const showAddModal = () => {
    setEditingEmployee(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (employee) => {
    setEditingEmployee(employee);
    form.setFieldsValue(employee);
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEmployee(null);
  };

  const handleDelete = (employeeId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this employee?',
      icon: <ExclamationCircleFilled />,
      content: 'This will permanently remove the employee from the system. This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk: () => {
        setEmployees(employees.filter((emp) => emp.id !== employeeId));
        message.success('Employee deleted successfully');
      },
    });
  };

  const handleFormSubmit = (values) => {
    if (!values.name || !values.email || !values.position || !values.username || !values.password) {
      setError('All fields are required. Please fill out the form completely.');
      return;
    }

    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? { ...emp, ...values } : emp
        )
      );
      message.success('Employee updated successfully!');
    } else {
      const newEmployee = { id: `emp${Date.now()}`, ...values };
      setEmployees([...employees, newEmployee]);
      message.success('Employee added successfully!');
    }
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Position', dataIndex: 'position', key: 'position' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => navigate(`/employees/${record.id}`)}>View</Button>
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>Edit</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <ErrorCard message={error} onClose={() => setError('')} />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <Title level={2} className="!mb-0">Employee Management</Title>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Search
            placeholder="Search employees..."
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={showAddModal}
            className="w-full sm:w-auto"
          >
            Add Employee
          </Button>
        </div>
      </div>
      
      <Table columns={columns} dataSource={filteredEmployees} rowKey="id" bordered />

      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} autoComplete="off">
          <Form.Item name="name" label="Full Name"><Input /></Form.Item>
          <Form.Item name="email" label="Email Address"><Input /></Form.Item>
          <Form.Item name="position" label="Position"><Input /></Form.Item>
          <Form.Item name="username" label="App Username"><Input /></Form.Item>
          <Form.Item name="password" label="App Password"><Input.Password /></Form.Item>
          <Form.Item className="!mb-0">
            <Button type="primary" htmlType="submit" block>
              {editingEmployee ? 'Save Changes' : 'Create Employee'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Employees;