/**
 * FILE: clearOldData.js
 * MỤC ĐÍCH: Cung cấp các utility functions để xóa dữ liệu cũ trong localStorage
 * Được sử dụng khi cần reset dữ liệu hoặc logout user
 */

/**
 * Hàm xóa toàn bộ dữ liệu trong localStorage
 * 
 * CHỨC NĂNG:
 * - Xóa hoàn toàn tất cả dữ liệu được lưu trong localStorage của trình duyệt
 * - Sử dụng khi cần reset hoàn toàn ứng dụng về trạng thái ban đầu
 * 
 * CÁCH HOẠT ĐỘNG:
 * 1. In thông báo bắt đầu quá trình xóa dữ liệu
 * 2. Gọi localStorage.clear() để xóa tất cả key-value pairs
 * 3. In thông báo hoàn thành
 * 
 * LƯU Ý: Hàm này sẽ xóa ALL dữ liệu, không chỉ dữ liệu của ứng dụng này
 */
export const clearAllOldData = () => {
  // In thông báo bắt đầu với icon emoji để dễ nhận biết trong console
  console.log('🧹 Clearing all old localStorage data...');
  
  // Xóa hoàn toàn tất cả dữ liệu trong localStorage
  // localStorage.clear() là method built-in của Web Storage API
  localStorage.clear();
  
  // In thông báo hoàn thành với icon check mark
  console.log('✅ All localStorage data cleared');
};

/**
 * Hàm xóa chỉ dữ liệu liên quan đến user (selective clearing)
 * 
 * CHỨC NĂNG:
 * - Xóa các dữ liệu cụ thể liên quan đến thông tin user và authentication
 * - An toàn hơn clearAllOldData vì chỉ xóa dữ liệu của ứng dụng
 * - Thường được sử dụng khi user logout
 * 
 * CÁCH HOẠT ĐỘNG:
 * 1. Define một array các keys cần xóa
 * 2. Loop qua từng key và xóa khỏi localStorage
 * 3. Log từng key đã được xóa để theo dõi
 * 
 * CÁC KEY ĐƯỢC XÓA:
 * - token: JWT token để authenticate user
 * - userEmail: Email của user đang đăng nhập
 * - userRole: Role/quyền của user (admin, user, etc.)
 * - user: Object chứa thông tin user
 * - profileData: Dữ liệu profile chi tiết của user
 * - lastLoginTime: Thời gian đăng nhập lần cuối
 * - apiErrors: Lỗi API được cache
 */
export const clearUserData = () => {
  // In thông báo bắt đầu quá trình xóa dữ liệu user
  console.log('🧹 Clearing user-related localStorage data...');
  
  // Danh sách các keys trong localStorage cần được xóa
  // Chỉ bao gồm những dữ liệu liên quan đến user authentication và profile
  const keysToRemove = [
    'token',          // JWT authentication token
    'userEmail',      // Email address của user
    'userRole',       // Role/permission level của user
    'user',           // Object chứa thông tin user tổng quát
    'profileData',    // Dữ liệu profile chi tiết (avatar, settings, etc.)
    'lastLoginTime',  // Timestamp của lần đăng nhập cuối
    'apiErrors'       // Cache các lỗi API để hiển thị
  ];
  
  // Loop qua từng key trong danh sách và xóa khỏi localStorage
  keysToRemove.forEach(key => {
    // localStorage.removeItem() xóa một key cụ thể
    // Nếu key không tồn tại, method này không làm gì cả (không throw error)
    localStorage.removeItem(key);
    
    // Log key đã được xóa để developer có thể track trong console
    console.log(`  - Removed: ${key}`);
  });
  
  // In thông báo hoàn thành
  console.log('✅ User data cleared');
};
