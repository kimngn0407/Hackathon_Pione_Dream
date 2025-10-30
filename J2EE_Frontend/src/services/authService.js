/**
 * FILE: authService.js
 * MỤC ĐÍCH: Service cung cấp các utility functions cho authentication
 * Xử lý token, user role và user email retrieval
 */

// Import accountService để access các account-related functions
import accountService from './accountService';

/**
 * Lấy authentication token từ localStorage
 * 
 * @returns {string|null} Token string hoặc null nếu không có
 */
export const getToken = () => accountService.getToken();

/**
 * Helper function để decode simple token (không phải JWT)
 * 
 * TOKEN FORMAT: Base64 encoded JSON string
 * CONTENT: { email: string, timestamp: number }
 * 
 * @param {string} token - Base64 encoded token
 * @returns {object|null} Decoded token object hoặc null nếu lỗi
 */
const decodeSimpleToken = (token) => {
  try {
    // atob() decode base64 string thành regular string
    const jsonString = atob(token);
    // Parse JSON string thành object
    return JSON.parse(jsonString);
  } catch (err) {
    console.error('Simple token decode error:', err);
    return null;
  }
};

/**
 * Lấy user role từ localStorage hoặc xác định dựa trên email
 * 
 * LOGIC:
 * 1. Kiểm tra userRole trong localStorage trước
 * 2. Nếu không có, xác định role dựa trên email
 * 3. Admin emails: 'admin@farm.com', 'thienpt13042004@gmail.com'
 * 4. Default role: 'user'
 * 
 * @returns {string} User role: 'admin' hoặc 'user'
 */
export const getUserRole = () => {
  // Ưu tiên lấy role đã lưu trong localStorage
  const savedRole = localStorage.getItem('userRole');
  if (savedRole) {
    return savedRole;
  }
  
  // Fallback: xác định role dựa trên email
  const email = accountService.getCurrentUserEmail();
  
  // Hardcoded admin emails cho development/testing
  if (email === 'admin@farm.com' || email === 'thienpt13042004@gmail.com') {
    return 'admin';
  }
  
  // Default role cho tất cả users khác
  return 'user';
};

/**
 * Lấy user email từ accountService
 * 
 * WRAPPER FUNCTION: Delegate tới accountService.getCurrentUserEmail()
 * 
 * @returns {string|null} User email hoặc null nếu không đăng nhập
 */
export const getUserEmail = () => {
  // Delegate tới accountService thay vì decode token trực tiếp
  return accountService.getCurrentUserEmail();
};
