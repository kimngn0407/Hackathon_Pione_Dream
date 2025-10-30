/**
 * FILE: App.js
 * MỤC ĐÍCH: Component chính của ứng dụng Smart Farm
 * Quản lý routing, authentication và theme của toàn bộ ứng dụng
 */

// Import React library
import React from 'react';

// Import React Router để quản lý routing/navigation
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Material-UI theme system để tạo giao diện đồng nhất
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Reset CSS mặc định của browser

// Import Layout component chính
import Layout from './components/Layout';

// Import các page components cho authentication
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Import các page components chính của ứng dụng
import Dashboard from './pages/dashboard/Dashboard';          // Trang dashboard chính
import Farm from './pages/farm/Farm';                        // Quản lý nông trại
import Settings from './pages/settings/Settings';            // Cài đặt hệ thống
import FarmManager from './pages/farm/Farm';                 // Duplicate import (có thể clean up)
import FieldManager from './pages/field/Field';              // Quản lý đồng ruộng
import CropManager from './pages/crop/Crop';                 // Quản lý cây trồng
import PestDetection from './pages/crop/PestDetection';      // Phát hiện sâu bệnh
import SensorManager from './pages/sensor/Sensor';           // Quản lý cảm biến
import AlertScreen from './pages/alert/Alert';               // Màn hình cảnh báo
import HarvestRevenue from './pages/harvestrevenue/HarvestRevenue'; // Quản lý doanh thu
import HarvestScreen from './pages/harvest/Harvest';         // Quản lý thu hoạch
import UserProfile from './pages/userProfile/AccountManager'; // Profile người dùng
import SystemSettings from './pages/settings/Settings';      // Duplicate import (có thể clean up)
import IrrigationManager from './pages/irrigation/Irrigation'; // Quản lý tưới tiêu

// Import các page components phụ
import NotFound from './pages/NotFound';                     // Trang 404
import UnderDevelopmentPage from './pages/UnderDevelopmentPage'; // Trang đang phát triển
import AccountManager from './pages/userProfile/AccountManager'; // Quản lý tài khoản
import Profile from './pages/userProfile/Profile';           // Profile cá nhân

// Import component bảo vệ route theo role
import RoleGuard from './components/Auth/RoleGuard';

/**
 * Tạo theme Material-UI cho toàn bộ ứng dụng
 * Định nghĩa color palette và styling defaults
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',    // Màu xanh chính (Blue 700)
    },
    secondary: {
      main: '#2196F3',    // Màu xanh phụ (Blue 500) 
    },
    background: {
      default: '#f5f5f5', // Màu nền mặc định (Grey 100)
    },
  },
});

/**
 * Component App chính - Root component của ứng dụng
 * 
 * CHỨC NĂNG:
 * - Quản lý routing cho toàn bộ ứng dụng
 * - Kiểm tra authentication status
 * - Cung cấp theme context cho tất cả components
 * - Bảo vệ các route cần authentication
 * 
 * FLOW HOẠT ĐỘNG:
 * 1. Kiểm tra token trong localStorage để xác định login status
 * 2. Route "/" redirect về "/login" 
 * 3. Các route khác yêu cầu authentication mới access được
 * 4. Admin routes được bảo vệ bởi RoleGuard component
 */
const App = () => {
  // Kiểm tra trạng thái đăng nhập dựa vào sự tồn tại của token trong localStorage
  // Boolean() chuyển giá trị thành true/false
  // localStorage.getItem('token') trả về string hoặc null
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    // ThemeProvider cung cấp theme cho toàn bộ ứng dụng Material-UI
    <ThemeProvider theme={theme}>
      {/* CssBaseline reset CSS mặc định của browser để có base styling nhất quán */}
      <CssBaseline />
      
      {/* BrowserRouter cung cấp routing functionality cho ứng dụng */}
      <Router>
        <Routes>
          {/* PUBLIC ROUTES - Không cần đăng nhập */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* ROOT ROUTE REDIRECT */}
          {/* Luôn chuyển hướng route "/" về "/login" */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* PROTECTED ROUTES - Cần đăng nhập mới truy cập được */}
          {/* Nếu đã đăng nhập thì render Layout, nếu chưa thì redirect về login */}
          <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}>
            {/* Main dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Farm management routes */}
            <Route path="/farm" element={<Farm />} />
            <Route path="/field" element={<FieldManager />} />
            <Route path="/crop" element={<CropManager />} />
            <Route path="/pest-detection" element={<PestDetection />} />
            
            {/* Sensor and monitoring routes */}
            <Route path="/sensor" element={<SensorManager />} />
            <Route path="/alert" element={<AlertScreen />} />
            
            {/* Harvest and revenue management */}
            <Route path="/harvest" element={<HarvestScreen />} />
            <Route path="/harvest-revenue" element={<HarvestRevenue />} />
            
            {/* Irrigation system */}
            <Route path="/irrigation" element={<IrrigationManager />} />
            
            {/* User profile routes */}
            <Route path="/profile" element={<Profile />} />
            
            {/* ADMIN ONLY ROUTES - Chỉ admin mới truy cập được */}
            {/* RoleGuard component kiểm tra role của user */}
            <Route path="/accounts" element={
              <RoleGuard allowedRoles={['ADMIN']}>
                <AccountManager />
              </RoleGuard>
            } />
            
            {/* System settings */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/system" element={<SystemSettings />} />
          </Route>
          
          {/* FALLBACK ROUTE - Trang 404 cho tất cả routes không match */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
