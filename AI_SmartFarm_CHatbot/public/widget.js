/**
 * Smart Farm Bot Widget Loader
 * Copy file này vào thư mục public của bạn và host nó
 * Sau đó embed vào website bằng cách thêm thẻ script
 */

(function() {
  'use strict';

  // URL của chatbot đã deploy
  const CHATBOT_URL = 'https://your-deployed-chatbot-url.com';
  
  // Tạo container cho chatbot
  const createChatbotContainer = () => {
    const iframe = document.createElement('iframe');
    iframe.id = 'smart-farm-chatbot-iframe';
    iframe.src = CHATBOT_URL;
    iframe.setAttribute('allow', 'microphone');
    iframe.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      height: 600px;
      max-width: calc(100vw - 40px);
      max-height: calc(100vh - 40px);
      border: none;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      z-index: 9999;
      display: none;
    `;
    
    return iframe;
  };

  // Tạo nút toggle
  const createToggleButton = () => {
    const button = document.createElement('button');
    button.id = 'smart-farm-chatbot-toggle';
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
    
    return button;
  };

  // Initialize chatbot
  const initChatbot = () => {
    const iframe = createChatbotContainer();
    const button = createToggleButton();
    
    let isOpen = false;
    
    button.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        iframe.style.display = 'block';
        button.style.display = 'none';
      } else {
        iframe.style.display = 'none';
        button.style.display = 'flex';
      }
    });
    
    // Close khi click outside
    document.addEventListener('click', (e) => {
      if (isOpen && !iframe.contains(e.target) && !button.contains(e.target)) {
        // Optional: uncomment để tự động đóng khi click outside
        // isOpen = false;
        // iframe.style.display = 'none';
        // button.style.display = 'flex';
      }
    });
    
    document.body.appendChild(iframe);
    document.body.appendChild(button);
  };

  // Chờ DOM load xong
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();

