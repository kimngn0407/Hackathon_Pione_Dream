import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ParticlesBackground } from "@/components/particles-background";
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Smart Farm Bot - Trợ lý AI về Nông nghiệp thông minh',
  description: 'Chatbot AI hỗ trợ kiến thức về cây trồng, canh tác nông nghiệp và nông nghiệp thông minh tại Việt Nam.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#1e1b4b" />
      </head>
      <body className={cn("font-sans antialiased h-full overflow-hidden")}>
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <ParticlesBackground />
        </div>
        <div className="relative z-10 h-full">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
