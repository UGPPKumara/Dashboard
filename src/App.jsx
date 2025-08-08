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
        components: {
          Button: {
            colorPrimary: '#0958d9',
            colorPrimaryHover: '#1677ff',
            colorPrimaryActive: '#002c8c',
          },
          // Add more component customizations as needed
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