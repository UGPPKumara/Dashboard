import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Customers from '../pages/Customers';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ForgotPassword from '../pages/ForgotPassword'; // <-- Import the new page
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    // Add the new route for the forgot password page
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
      { path: 'customers', element: <Customers /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;