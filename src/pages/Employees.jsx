import React, { useState, useEffect } from 'react';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { employeeData as initialEmployeeData } from '../data/mockData';
import ErrorCard from '../components/ErrorCard'; // Import the reusable ErrorCard

// --- Reusable Modal Component ---
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4">
      <div className="p-4 border-b flex justify-between items-center">
        {children[0]} {/* Title Slot */}
        <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
          <CloseOutlined />
        </button>
      </div>
      <div className="p-6">{children[1]}</div> {/* Body Slot */}
    </div>
  </div>
);

// --- Main Employees Component ---
const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployeeData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formState, setFormState] = useState({});
  const [error, setError] = useState('');

  // Effect to clear error message after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const showAddModal = () => {
    setEditingEmployee(null);
    setFormState({});
    setIsModalOpen(true);
  };

  const showEditModal = (employee) => {
    setEditingEmployee(employee);
    setFormState(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
        setEmployees(employees.filter(emp => emp.id !== employeeId));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.position || !formState.username || !formState.password) {
      setError('All fields are required.');
      return;
    }

    if (editingEmployee) {
      // Update
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? { ...emp, ...formState } : emp));
    } else {
      // Add new
      const newEmployee = { id: `emp${Date.now()}`, ...formState };
      setEmployees([...employees, newEmployee]);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ErrorCard message={error} onClose={() => setError('')} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-9">Employee Management</h1>
        <button
          onClick={showAddModal}
          className="bg-blue-6 hover:bg-blue-5 text-white font-bold py-2 px-4 rounded-md inline-flex items-center transition-colors"
        >
          <PlusOutlined className="mr-2" />
          Add Employee
        </button>
      </div>

      {/* Custom Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left font-semibold text-slate-600">Name</th>
                <th className="p-3 text-left font-semibold text-slate-600">Email</th>
                <th className="p-3 text-left font-semibold text-slate-600">Position</th>
                <th className="p-3 text-left font-semibold text-slate-600">Username</th>
                <th className="p-3 text-left font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="border-b hover:bg-slate-50">
                  <td className="p-3 text-slate-800">{emp.name}</td>
                  <td className="p-3 text-slate-500">{emp.email}</td>
                  <td className="p-3 text-slate-500">{emp.position}</td>
                  <td className="p-3 text-slate-500">{emp.username}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button onClick={() => showEditModal(emp)} className="text-blue-6 hover:text-blue-5"><EditOutlined /></button>
                      <button onClick={() => handleDelete(emp.id)} className="text-red-500 hover:text-red-400"><DeleteOutlined /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Custom Modal for Add/Edit */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold text-blue-9">{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
          
          <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-slate-600">Full Name</label>
              <input type="text" name="name" value={formState.name || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-5 focus:border-blue-5"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600">Email Address</label>
              <input type="email" name="email" value={formState.email || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-5 focus:border-blue-5"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600">Position</label>
              <input type="text" name="position" value={formState.position || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-5 focus:border-blue-5"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600">App Username</label>
              <input type="text" name="username" value={formState.username || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-5 focus:border-blue-5"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600">App Password</label>
              <input type="password" name="password" value={formState.password || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-5 focus:border-blue-5"/>
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full bg-blue-6 hover:bg-blue-5 text-white font-bold py-2 px-4 rounded-md transition-colors">
                {editingEmployee ? 'Save Changes' : 'Create Employee'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Employees;