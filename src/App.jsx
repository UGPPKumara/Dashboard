import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from 'antd';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        // Global tokens that affect all components
        token: {
            colorPrimary: '#1677ff'
        },
        // Component-specific overrides
        components: {
          Button: {
            colorPrimaryHover: '#1677ff', 
            colorPrimaryActive: 'blue-9',
          },
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