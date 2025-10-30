/**
 * WebSocket Service for Real-time Alerts
 * Connects to backend WebSocket at ws://localhost:8080/ws
 */

class WebSocketService {
  constructor() {
    this.socket = null;
    this.stompClient = null;
    this.connected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000; // 3 seconds
  }

  /**
   * Connect to WebSocket server
   * @param {Function} onMessageCallback - Callback when receiving alert message
   */
  connect(onMessageCallback) {
    // Backend WebSocket URL
    const wsUrl = 'ws://localhost:8080/ws';

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log('✅ WebSocket connected to backend');
        this.connected = true;
        this.reconnectAttempts = 0;
      };

      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('📨 Received WebSocket message:', message);
          
          if (onMessageCallback && typeof onMessageCallback === 'function') {
            onMessageCallback(message);
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      this.socket.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };

      this.socket.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        this.connected = false;
        this.handleReconnect(onMessageCallback);
      };

    } catch (error) {
      console.error('❌ Failed to create WebSocket connection:', error);
    }
  }

  /**
   * Reconnect logic
   */
  handleReconnect(onMessageCallback) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      setTimeout(() => {
        this.connect(onMessageCallback);
      }, this.reconnectDelay);
    } else {
      console.error('❌ Max reconnect attempts reached. Please refresh the page.');
    }
  }

  /**
   * Send message to WebSocket server
   * @param {Object} message - Message to send
   */
  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('⚠️ WebSocket is not connected');
    }
  }

  /**
   * Subscribe to specific topic (if using STOMP)
   * @param {String} topic - Topic to subscribe
   * @param {Function} callback - Callback function
   */
  subscribe(topic, callback) {
    // If backend uses STOMP protocol, implement here
    console.log(`📡 Subscribing to topic: ${topic}`);
    // TODO: Implement STOMP subscription if needed
  }

  /**
   * Disconnect WebSocket
   */
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.connected = false;
      console.log('🔌 WebSocket disconnected manually');
    }
  }

  /**
   * Check if connected
   * @returns {Boolean}
   */
  isConnected() {
    return this.connected && this.socket && this.socket.readyState === WebSocket.OPEN;
  }
}

// Singleton instance
const websocketService = new WebSocketService();

export default websocketService;

