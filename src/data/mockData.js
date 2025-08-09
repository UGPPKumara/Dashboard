export const employeeData = [
  {
    id: 'emp001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    position: 'Field Officer',
    username: 'johnd',
    password: 'password123', // For demonstration only
  },
  {
    id: 'emp002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    position: 'Senior Field Officer',
    username: 'janes',
    password: 'password123',
  },
  {
    id: 'emp003',
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    position: 'Field Officer',
    username: 'peterj',
    password: 'password123',
  },
   {
    id: 'emp004',
    name: 'Mary Williams',
    email: 'mary.williams@example.com',
    position: 'Team Lead',
    username: 'maryw',
    password: 'password123',
  },
];


export const customerData = [
  {
    id: 'cust001',
    name: 'Global Tech Inc.',
    contact: 'contact@globaltech.com',
    address: '123 Tech Park, Silicon Valley',
    registeredBy: 'John Doe',
    location: { lat: 37.3861, lng: -122.0839 },
  },
  {
    id: 'cust002',
    name: 'Innovate Solutions',
    contact: 'hello@innovate.com',
    address: '456 Innovation Drive, Austin',
    registeredBy: 'Jane Smith',
    location: { lat: 30.2672, lng: -97.7431 },
  },
  {
    id: 'cust003',
    name: 'Pioneer Industries',
    contact: 'info@pioneer.io',
    address: '789 Pioneer Rd, Boston',
    registeredBy: 'John Doe',
    location: { lat: 42.3601, lng: -71.0589 },
  },
  {
    id: 'cust004',
    name: 'Quantum Co',
    contact: 'support@quantum.co',
    address: '101 Quantum Blvd, New York',
    registeredBy: 'Peter Jones',
    location: { lat: 40.7128, lng: -74.0060 },
  },
];

export const notificationData = [
  {
    id: 1,
    title: 'New Customer Registered',
    description: 'John Doe registered a new customer: Global Tech Inc.',
    read: false,
  },
  {
    id: 2,
    title: 'Attendance Marked',
    description: 'Jane Smith has marked her attendance for today.',
    read: false,
  },
  {
    id: 3,
    title: 'Visit Logged',
    description: 'Peter Jones completed a visit to Pioneer Industries.',
    read: true,
  },
];

export const visitsData = [
  {
    visitId: 'v001',
    employeeId: 'emp001', // John Doe
    customerId: 'cust001', // Global Tech Inc.
    visitDate: '2025-08-08T09:15:00Z',
    attendanceMethod: 'Fingerprint Scan',
    location: { lat: 37.3875, lng: -122.0841 }, // Location captured during visit
    nextVisitDate: '2025-09-08',
  },
  {
    visitId: 'v002',
    employeeId: 'emp002', // Jane Smith
    customerId: 'cust002', // Innovate Solutions
    visitDate: '2025-08-08T11:30:00Z',
    attendanceMethod: 'Fingerprint Scan',
    location: { lat: 30.2672, lng: -97.7431 },
    nextVisitDate: '2025-09-10',
  },
  {
    visitId: 'v003',
    employeeId: 'emp001', // John Doe
    customerId: 'cust003', // Pioneer Industries
    visitDate: '2025-08-07T14:00:00Z',
    attendanceMethod: 'Fingerprint Scan',
    location: { lat: 42.3611, lng: -71.0599 },
    nextVisitDate: '2025-09-07',
  },
];