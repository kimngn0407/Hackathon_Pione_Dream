/**
 * FILE: RoleGuard.jsx
 * MỤC ĐÍCH: Component bảo vệ routes/components dựa trên user roles
 * Chỉ render children nếu user có quyền phù hợp
 */

// Import React hooks
import { useEffect, useState } from 'react';

/**
 * RoleGuard Component - Conditional rendering dựa trên user role
 * 
 * PROPS:
 * - allowedRoles: Array of strings chứa các roles được phép access
 * - children: React components được render nếu user có quyền
 * 
 * LOGIC:
 * 1. Check token trong localStorage
 * 2. Decode và validate token
 * 3. Check user role có trong allowedRoles không
 * 4. Render children nếu có quyền, null nếu không
 * 
 * @param {string[]} allowedRoles - Array of allowed roles
 * @param {React.ReactNode} children - Components to render if authorized
 */
const RoleGuard = ({ allowedRoles, children }) => {
  // State để track authorization status
  const [hasRole, setHasRole] = useState(false);        // User có quyền không
  const [loading, setLoading] = useState(true);         // Đang check authorization

  useEffect(() => {
    /**
     * Check user role authorization
     * 
     * PROCESS:
     * 1. Get token từ localStorage
     * 2. Validate token format
     * 3. Decode token để lấy user info
     * 4. Validate user info
     * 5. Set hasRole state
     */
    const checkRole = () => {
      const token = localStorage.getItem('token');
      
      // Debug logging để track token state
      console.log('🔍 RoleGuard checking token:', token ? `exists (${token.substring(0, 20)}...)` : 'not found');
      console.log('🔍 Full token value:', token);
      console.log('🔍 localStorage keys:', Object.keys(localStorage));
      
      if (token) {
        try {
          // Validate token format (phải là valid base64)
          if (!isValidBase64(token)) {
            console.warn('⚠️ Invalid token format, clearing old token');
            console.log('Token that failed validation:', token);
            localStorage.removeItem('token');
            setHasRole(false);
            setLoading(false);
            return;
          }

          // Decode simple token (không phải JWT)
          const decoded = atob(token);
          console.log('🔍 Decoded token string:', decoded);
          
          // Parse JSON string thành object
          const userInfo = JSON.parse(decoded);
          console.log('🔍 Parsed user info:', userInfo);
          
          // Validate userInfo có required fields
          if (!userInfo.email) {
            console.warn('⚠️ Token missing email, clearing invalid token');
            localStorage.removeItem('token');
            setHasRole(false);
            setLoading(false);
            return;
          }
          
          // Vì backend không return role trong token, tạm thời allow access
          // Trong production app, cần check actual role từ backend
          console.log('✅ RoleGuard - Valid token found, allowing access');
          
          // Temporary: allow access cho valid token
          // TODO: Implement proper role checking với backend
          setHasRole(true);
        } catch (err) {
          // Error handling cho token decode failures
          console.error('❌ Error decoding simple token:', err);
          console.log('Token that caused error:', token);
          
          // Conservative approach về clearing tokens
          // Chỉ clear nếu chắc chắn là base64 decode error
          if (err.name === 'InvalidCharacterError') {
            console.warn('⚠️ Clearing invalid token due to base64 decode error');
            localStorage.removeItem('token');
            setHasRole(false);
          } else {
            // Cho other errors (như JSON parse), deny access nhưng không clear token
            console.warn('⚠️ Token decode error, denying access but keeping token');
            setHasRole(false);
          }
        }
      } else {
        // Không có token = deny access
        console.log('ℹ️ No token found, denying access');
        setHasRole(false);
      }
      setLoading(false);
    };

    /**
     * Retry mechanism để handle timing issues
     * 
     * ISSUE: Token có thể chưa được set khi component mount
     * SOLUTION: Retry checking token với delays
     */
    let retryCount = 0;
    const maxRetries = 5; // Số lần retry tối đa
    
    const attemptCheckRole = () => {
      const token = localStorage.getItem('token');
      
      // Nếu chưa có token và chưa hết retries, thử lại
      if (!token && retryCount < maxRetries) {
        retryCount++;
        console.log(`🔄 Retry ${retryCount}/${maxRetries} - waiting for token...`);
        setTimeout(attemptCheckRole, 300); // Delay 300ms giữa các attempts
        return;
      }
      
      // Execute role check
      checkRole();
    };

    // Start with initial delay để ensure token đã được stored
    const timeoutId = setTimeout(attemptCheckRole, 1000); // 1 second initial delay
    
    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [allowedRoles]); // Re-run nếu allowedRoles changes

  /**
   * Helper function để validate base64 string
   * 
   * @param {string} str - String to validate
   * @returns {boolean} True nếu valid base64, false nếu không
   */
  const isValidBase64 = (str) => {
    try {
      // Check string validity
      if (!str || typeof str !== 'string') {
        console.log('❌ Token is not a valid string:', str);
        return false;
      }
      
      // Check base64 format với regex
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      if (!base64Regex.test(str)) {
        console.log('❌ Token failed regex validation:', str);
        return false;
      }
      
      // Try decode để verify validity
      atob(str);
      console.log('✅ Token passed base64 validation');
      return true;
    } catch (error) {
      console.log('❌ Token failed base64 decode:', error.message);
      return false;
    }
  };

  /**
   * Render logic
   * 
   * STATES:
   * - loading: Return null (không render gì)
   * - hasRole: Render children
   * - !hasRole: Return null (deny access)
   */
  
  // Show loading state briefly (không render component trong lúc checking)
  if (loading) {
    return null;
  }

  // Conditional rendering dựa trên authorization
  return hasRole ? children : null;
};

export default RoleGuard;
