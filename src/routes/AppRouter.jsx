import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import EmployeeDetails from '../pages/EmployeeDetails';
import Customers from '../pages/Customers';
import CustomerDetails from '../pages/CustomerDetails';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ForgotPassword from '../pages/ForgotPassword';
import ProtectedRoute from './ProtectedRoute';
import Departments from '../pages/Departments';
import Positions from '../pages/Positions';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'employees', element: <Employees /> },
      { path: 'employees/:employeeId', element: <EmployeeDetails /> },
      { path: 'customers', element: <Customers /> },
      { path: 'customers/:customerId', element: <CustomerDetails /> },
      { path: 'profile', element: <Profile /> },
      { path: 'departments', element: <Departments /> },
      { path: 'positions', element: <Positions /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;