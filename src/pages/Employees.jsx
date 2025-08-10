import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Typography,
  message,
  Tabs,
  DatePicker,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import ErrorCard from '../components/ErrorCard';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const employeesCollectionRef = collection(db, 'employees');
  const departmentsCollectionRef = collection(db, 'departments');
  const positionsCollectionRef = collection(db, 'positions');

  useEffect(() => {
    const unsubEmployees = onSnapshot(employeesCollectionRef, (snapshot) => {
      setEmployees(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
    const unsubDepartments = onSnapshot(departmentsCollectionRef, (snapshot) => {
      setDepartments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    const unsubPositions = onSnapshot(positionsCollectionRef, (snapshot) => {
      setPositions(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => {
      unsubEmployees();
      unsubDepartments();
      unsubPositions();
    };
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const showAddModal = () => {
    setEditingEmployee(null);
    form.resetFields();
    if (activeTab !== 'all') {
      form.setFieldsValue({ departmentId: activeTab });
    }
    setIsModalVisible(true);
  };

  const showEditModal = (employee) => {
    setEditingEmployee(employee);
    const formValues = {
        ...employee,
        birthday: employee.birthday ? dayjs(employee.birthday.toDate()) : null,
    }
    form.setFieldsValue(formValues);
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEmployee(null);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this employee?',
      icon: <ExclamationCircleFilled />,
      content: 'This will permanently remove the employee from the system. This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk: async () => {
        try {
            const employeeDoc = doc(db, 'employees', id);
            await deleteDoc(employeeDoc);
            message.success('Employee deleted successfully');
        } catch (err) {
            message.error("Failed to delete employee.");
        }
      },
    });
  };

  const handleFormSubmit = async (values) => {
    try {
        if (editingEmployee) {
          const employeeDoc = doc(db, 'employees', editingEmployee.id);
          await updateDoc(employeeDoc, values);
          message.success('Employee updated successfully!');
        } else {
          await addDoc(employeesCollectionRef, values);
          message.success('Employee added successfully!');
        }
        setIsModalVisible(false);
    } catch (err) {
        message.error("An error occurred. Please try again.");
    }
  };

  const columns = [
    { 
        title: 'Name', 
        key: 'name', 
        sorter: (a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
        render: (_, record) => `${record.firstName} ${record.lastName}`
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { 
      title: 'Department', 
      dataIndex: 'departmentId', 
      key: 'departmentId',
      render: (departmentId) => departments.find(d => d.id === departmentId)?.name || 'N/A'
    },
    { 
      title: 'Position', 
      dataIndex: 'positionId', 
      key: 'positionId',
      render: (positionId) => positions.find(p => p.id === positionId)?.name || 'N/A'
    },
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

  const getFilteredEmployees = () => {
    let filtered = employees;
    if (activeTab !== 'all') {
      filtered = filtered.filter(emp => emp.departmentId === activeTab);
    }
    if (searchText) {
      filtered = filtered.filter(emp => 
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return filtered;
  };
  
  const tabItems = [
    {
        key: 'all',
        label: 'All Employees',
    },
    ...departments.map(dept => ({
        key: dept.id,
        label: dept.name,
    }))
  ];

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
      
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} items={tabItems} />

      <Table columns={columns} dataSource={getFilteredEmployees()} rowKey="id" loading={loading} bordered />

      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} autoComplete="off">
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="birthday" label="Birthday">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="departmentId" label="Department" rules={[{ required: true }]}>
                        <Select placeholder="Select a department">
                        {departments.map(dept => (
                            <Option key={dept.id} value={dept.id}>{dept.name}</Option>
                        ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="positionId" label="Position" rules={[{ required: true }]}>
                        <Select placeholder="Select a position">
                        {positions.map(pos => (
                            <Option key={pos.id} value={pos.id}>{pos.name}</Option>
                        ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Title level={5}>Mobile App Credentials</Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="username" label="App Username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="password" label="App Password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
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
