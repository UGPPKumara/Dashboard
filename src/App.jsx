import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from 'antd'; // <-- Import ConfigProvider

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // This is the "blue-6" color 
          colorPrimary: '#1677ff', 
        },
      }}
    >
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;