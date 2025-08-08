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
        components: {
          // blue: {
          // 1: '#e6f4ff',
          // 2: '#bae0ff',
          // 3: '#91caff',
          // 4: '#69b1ff',
          // 5: '#4096ff',
          // 6: '#1677ff', // This is our  color
          // 7: '#0958d9',
          // 8: '#003eb3',
          // 9: '#002c8c',
          // 10: '#001d66',
          Button: {
           
            colorPrimaryHover: '#4096ff', 
            colorPrimaryActive: '#002c8c',
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