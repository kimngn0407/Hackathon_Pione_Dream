/**
 * API Configuration
 * Centralized API endpoint configuration for all environments
 */

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  // Production: Use Railway backend
  if (process.env.NODE_ENV === 'production') {
    return 'https://hackathonpionedream-production.up.railway.app';
  }
  
  // Development: Can override with environment variable or use Railway
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Default: Use Railway backend (works for both dev and prod)
  return 'https://hackathonpionedream-production.up.railway.app';
};

// Export the API base URL
export const API_BASE_URL = getApiBaseUrl();

// WebSocket URL (wss for secure HTTPS connection, ws for HTTP)
export const WS_BASE_URL = API_BASE_URL.replace('https://', 'wss://').replace('http://', 'ws://');

// Export API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    HEALTH: `${API_BASE_URL}/api/auth/health`,
  },
  
  // Accounts
  ACCOUNTS: {
    BASE: `${API_BASE_URL}/api/accounts`,
    REGISTER: `${API_BASE_URL}/api/accounts/register`,
    LOGIN: `${API_BASE_URL}/api/accounts/login`,
    PROFILE: `${API_BASE_URL}/api/accounts/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/accounts/updateprofile`,
  },
  
  // Sensors
  SENSORS: {
    BASE: `${API_BASE_URL}/api/sensors`,
    DATA: `${API_BASE_URL}/api/sensors/data`,
  },
  
  // Pest & Disease Detection
  PEST_DISEASE: {
    DETECT: `${API_BASE_URL}/api/pest-disease/detect`,
    CLASSES: `${API_BASE_URL}/api/pest-disease/classes`,
    HEALTH: `${API_BASE_URL}/api/pest-disease/health`,
    HISTORY: `${API_BASE_URL}/api/pest-disease/history`,
  },
  
  // Crop Recommendation
  CROP: {
    RECOMMEND: `${API_BASE_URL}/api/crop/recommend`,
    HEALTH: `${API_BASE_URL}/api/crop/health`,
  },
  
  // Direct AI Services (bypass backend)
  DIRECT: {
    // Chatbot
    CHATBOT: 'https://hackathon-pione-dream-vzj5.vercel.app',
    
    // Pest & Disease AI (direct)
    PEST_AI: 'https://kimngan0407-pest-disease.hf.space',
    PEST_HEALTH: 'https://kimngan0407-pest-disease.hf.space/health',
    PEST_DETECT: 'https://kimngan0407-pest-disease.hf.space/api/detect',
    PEST_CLASSES: 'https://kimngan0407-pest-disease.hf.space/api/classes',
    
    // Crop Recommendation AI (direct)
    CROP_AI: 'https://hackathon-pione-dream.onrender.com',
    CROP_AI_HEALTH: 'https://hackathon-pione-dream.onrender.com/health',
    CROP_AI_RECOMMEND: 'https://hackathon-pione-dream.onrender.com/api/recommend',
  },
  
  // Alerts
  ALERTS: {
    BASE: `${API_BASE_URL}/api/alerts`,
  },
  
  // Farms
  FARMS: {
    BASE: `${API_BASE_URL}/api/farms`,
  },
  
  // Fields
  FIELDS: {
    BASE: `${API_BASE_URL}/api/fields`,
  },
  
  // Harvest
  HARVEST: {
    BASE: `${API_BASE_URL}/api/harvest`,
  },
  
  // Irrigation
  IRRIGATION: {
    BASE: `${API_BASE_URL}/api/irrigation`,
  },
};

// Log configuration in development
if (process.env.NODE_ENV !== 'production') {
  console.log('🔧 API Configuration:');
  console.log('  Environment:', process.env.NODE_ENV);
  console.log('  API Base URL:', API_BASE_URL);
}

export default {
  API_BASE_URL,
  API_ENDPOINTS,
};

