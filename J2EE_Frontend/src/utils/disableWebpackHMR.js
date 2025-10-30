/**
 * Disable Webpack Dev Server HMR WebSocket Warning
 * 
 * This suppresses the warning:
 * "WebSocket connection to 'ws://localhost:3000/ws' failed"
 * 
 * This is NOT an error from your code, but from webpack-dev-server
 * trying to establish HMR (Hot Module Replacement) connection.
 */

// Suppress specific console errors
const originalConsoleError = console.error;

console.error = (...args) => {
  // Filter out webpack HMR WebSocket errors
  const message = args[0];
  
  if (
    typeof message === 'string' &&
    (message.includes('WebSocket connection') ||
     message.includes('ws://localhost:3000/ws'))
  ) {
    // Ignore webpack HMR WebSocket errors
    return;
  }
  
  // Call original console.error for other errors
  originalConsoleError.apply(console, args);
};

export default {};

