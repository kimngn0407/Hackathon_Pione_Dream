"use client";

import { useEffect, useState } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function TypingAnimation({ text, speed = 50, onComplete }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-1 h-4 bg-blue-400 animate-pulse ml-1" />
      )}
    </span>
  );
}

interface LoadingDotsProps {
  className?: string;
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
    </div>
  );
}