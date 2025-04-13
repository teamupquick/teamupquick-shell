import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
// 暫時使用內部 theme 定義代替 @teamupquick/shared
// import { theme } from '@teamupquick/shared';

// 臨時定義 theme
const theme = {
  text: {
    primary: '#3B3839',
    secondary: '#666666',
  }
};

// 需要加載的遠程模塊
const remoteModules = {
  auth: {
    url: 'http://localhost:3001', // 開發環境中的 auth 模塊地址
    modules: {
      Login: './Login',
      SignUp: './SignUp',
      Profile: './Profile',
    },
  },
  // 將來添加更多模塊...
};

// 懶加載遠程模塊
const loadModule = (remoteName: string, moduleName: string) => {
  const Remote = React.lazy(() => 
    import('./utils/loadRemote').then(({ loadRemoteModule }) => 
      loadRemoteModule({
        remoteName,
        remoteUrl: remoteModules[remoteName as keyof typeof remoteModules].url,
        moduleName: remoteModules[remoteName as keyof typeof remoteModules].modules[moduleName as keyof typeof remoteModules[keyof typeof remoteModules]['modules']],
      }).then(module => ({ default: module as React.ComponentType<any> }))
    )
  );

  return (props: any) => (
    <React.Suspense 
      fallback={
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>正在加載模塊...</Typography>
        </Box>
      }
    >
      <Remote {...props} />
    </React.Suspense>
  );
};

// 創建懶加載元件
// const AuthLogin = loadModule('auth', 'Login');
// const AuthSignUp = loadModule('auth', 'SignUp');
// const AuthProfile = loadModule('auth', 'Profile');

// 暫時使用一個占位符元件
const PlaceholderComponent = ({ name }: { name: string }) => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    height="100vh"
    bgcolor="#f5f5f5"
  >
    <Typography variant="h4" color={theme.text.primary}>
      {name} 模組將在部署後加載
    </Typography>
  </Box>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PlaceholderComponent name="登入" />} />
        <Route path="/signup" element={<PlaceholderComponent name="註冊" />} />
        <Route path="/profile" element={<PlaceholderComponent name="個人檔案" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 