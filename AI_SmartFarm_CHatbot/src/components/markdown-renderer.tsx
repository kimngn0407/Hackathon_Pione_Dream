"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface MarkdownRendererProps {
  content: string;
  theme?: 'light' | 'dark';
}

export function MarkdownRenderer({ content, theme = 'light' }: MarkdownRendererProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const isLight = theme === 'light';

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getTextColor = (defaultColor: string) => isLight ? defaultColor : 'text-white';
  const getBackgroundColor = (lightBg: string, darkBg: string) => isLight ? lightBg : darkBg;
  const getBorderColor = (lightBorder: string, darkBorder: string) => isLight ? lightBorder : darkBorder;

  // Preprocess content to handle HTML tags
  const preprocessContent = (text: string) => {
    return text
      .replace(/<br\s*\/?>/gi, '\n\n') // Convert <br> to double newlines for paragraph breaks
      .replace(/<\/br>/gi, '\n\n') // Handle closing br tags
      .replace(/<p>/gi, '\n\n') // Convert <p> to newlines
      .replace(/<\/p>/gi, '\n\n') // Convert </p> to newlines
      .trim();
  };

  return (
    <div className={`prose max-w-none ${isLight ? 'prose-gray' : 'prose-invert'}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headers
          h1: ({ children }) => (
            <h1 className={`text-2xl font-bold mb-4 pb-2 border-b ${getTextColor('text-gray-800')} ${getBorderColor('border-gray-200', 'border-white/30')} ${isLight ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : ''}`}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className={`text-xl font-semibold mb-3 mt-6 pb-1 border-b ${getTextColor('text-gray-800')} ${getBorderColor('border-gray-100', 'border-white/20')}`}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className={`text-lg font-semibold mb-2 mt-4 ${getTextColor('text-gray-800')}`}>
              {children}
            </h3>
          ),
          
          // Paragraphs
          p: ({ children }) => (
            <p className={`leading-relaxed mb-4 text-base ${getTextColor('text-gray-700')}`}>
              {children}
            </p>
          ),
          
          // Lists
          ul: ({ children }) => (
            <ul className="space-y-2 mb-4 ml-4 list-disc">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-2 mb-4 ml-4 list-decimal">
              {children}
            </ol>
          ),
          
          // Code
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');
            
            if (isBlock) {
              return (
                <div className="relative group mb-4">
                  <div className={`flex items-center justify-between px-4 py-2 rounded-t-lg ${getBackgroundColor('bg-gray-800', 'bg-gray-900')}`}>
                    <span className="text-sm text-gray-300 font-medium">
                      {className?.replace('language-', '') || 'code'}
                    </span>
                    <Button
                      onClick={() => copyToClipboard(String(children))}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {copiedCode === String(children) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <pre className={`p-4 rounded-b-lg overflow-x-auto ${getBackgroundColor('bg-gray-900', 'bg-gray-800')} text-gray-100`}>
                    <code>{children}</code>
                  </pre>
                </div>
              );
            }
            
            return (
              <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/20 text-white'}`}>
                {children}
              </code>
            );
          },
          
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className={`w-full border-collapse rounded-lg shadow-sm border ${getBackgroundColor('bg-white', 'bg-gray-800')} ${getBorderColor('border-gray-200', 'border-gray-700')}`}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className={getBackgroundColor('bg-gradient-to-r from-blue-50 to-purple-50', 'bg-gray-700')}>
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className={`border px-4 py-3 text-left font-semibold text-sm ${getBorderColor('border-gray-200', 'border-gray-600')} ${getTextColor('text-gray-800')}`}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className={`border px-4 py-3 text-sm ${getBorderColor('border-gray-200', 'border-gray-600')} ${getTextColor('text-gray-700')}`}>
              {children}
            </td>
          ),
          
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className={`border-l-4 pl-4 py-2 mb-4 italic ${isLight ? 'border-blue-500 bg-blue-50/50 text-gray-700' : 'border-white/30 bg-white/10 text-white'}`}>
              {children}
            </blockquote>
          ),
          
          // Links
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-2 transition-colors ${isLight ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'}`}
            >
              {children}
            </a>
          ),
          
          // Strong/Bold text
          strong: ({ children }) => (
            <strong className={`font-semibold ${getTextColor('text-gray-800')}`}>
              {children}
            </strong>
          ),
        }}
      >
        {preprocessContent(content)}
      </ReactMarkdown>
    </div>
  );
}