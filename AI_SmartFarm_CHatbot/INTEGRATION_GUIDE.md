# Hướng dẫn Tích hợp Smart Farm Bot vào Website

## Các cách tích hợp chatbot

### Cách 1: Nếu website của bạn là Next.js (Cùng project)

Nếu bạn muốn tích hợp chatbot vào một trang khác trong cùng project Next.js này:

```tsx
// src/app/your-page/page.tsx
import { ChatbotWidget } from "@/components/chatbot-widget";

export default function YourPage() {
  return (
    <div>
      {/* Nội dung trang của bạn */}
      <h1>Trang của bạn</h1>
      
      {/* Thêm chatbot */}
      <ChatbotWidget />
    </div>
  );
}
```

### Cách 2: Nếu website của bạn là Next.js (Khác project)

#### Bước 1: Deploy chatbot lên server

Deploy project này lên Vercel hoặc hosting:

```bash
# Build project
npm run build

# Deploy lên Vercel
vercel
```

#### Bước 2: Thêm chatbot vào website của bạn

Tạo một component trong website của bạn:

```tsx
// pages/_app.tsx hoặc app/layout.tsx trong Next.js project mới
import dynamic from 'next/dynamic';

const ChatbotWidget = dynamic(() => import('@/components/ChatbotIframe'), {
  ssr: false
});

export default function Layout({ children }) {
  return (
    <>
      {children}
      <ChatbotWidget />
    </>
  );
}
```

Tạo file `components/ChatbotIframe.tsx`:

```tsx
export default function ChatbotIframe() {
  return (
    <iframe
      src="https://your-deployed-chatbot-url.com"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        height: '600px',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        zIndex: 9999
      }}
      allow="microphone"
    />
  );
}
```

### Cách 3: Nếu website của bạn là HTML/CSS thuần

Tạo file `chatbot-widget.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Trang của bạn</title>
</head>
<body>
  <!-- Nội dung website của bạn -->
  
  <!-- Thêm chatbot -->
  <iframe
    id="smart-farm-chatbot"
    src="https://your-deployed-chatbot-url.com"
    style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      z-index: 9999;
    "
    allow="microphone"
  ></iframe>
</body>
</html>
```

### Cách 4: Embed bằng JavaScript (Phương pháp tốt nhất)

Tạo file `chatbot-loader.js` và host nó:

```javascript
(function() {
  const script = document.createElement('script');
  script.src = 'https://your-deployed-chatbot-url.com/widget.js';
  script.async = true;
  document.head.appendChild(script);
})();
```

Thêm vào website của bạn:

```html
<!-- Trước thẻ </body> -->
<script src="https://your-server.com/chatbot-loader.js"></script>
```

---

## Triển khai lên Server

### Option 1: Vercel (Khuyến nghị - Free)

1. Đăng ký tài khoản tại [vercel.com](https://vercel.com)
2. Kết nối GitHub repository
3. Vercel sẽ tự động deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Netlify

1. Đăng ký tại [netlify.com](https://netlify.com)
2. Kết nối repository
3. Build command: `npm run build`
4. Publish directory: `.next`

### Option 3: Tự host

```bash
# Build
npm run build

# Start production server
npm start
```

---

## Cấu hình Environment Variables

Tạo file `.env.local`:

```env
# Genkit AI Configuration
GENKIT_ENV=dev
GENKIT_PROJECT_ID=your-project-id
GOOGLE_GENAI_API_KEY=your-api-key
```

---

## Customization

### Thay đổi màu sắc

Chỉnh sửa trong `src/components/chatbot-widget.tsx`:

```tsx
// Thay đổi gradient
className="bg-gradient-to-r from-green-500 to-teal-500" // Thay vì blue-purple
```

### Thay đổi kích thước

```tsx
<ChatbotWidget 
  width="500px" 
  height="700px"
/>
```

### Thay đổi vị trí

Trong `chatbot-widget.tsx`, sửa:

```tsx
className="fixed bottom-4 right-4" // Thay đổi thành left-4 hoặc top-4
```

---

## Troubleshooting

### Chatbot không hiển thị

- Kiểm tra console browser xem có lỗi không
- Kiểm tra URL chatbot có đúng không
- Kiểm tra CORS settings

### Lỗi API

- Kiểm tra API key trong `.env.local`
- Kiểm tra kết nối internet
- Kiểm tra logs trên server

### Performance

- Sử dụng lazy loading cho chatbot
- Minify JavaScript files
- Enable caching cho static assets

---

## Liên hệ

Nếu cần hỗ trợ, vui lòng liên hệ developer.

