"use client";

import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import chatbot from '@/asset/chatbot.png';

interface ChatMessageProps {
  role: "user" | "assistant";
  children: React.ReactNode;
}

export function ChatMessage({ role, children }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  if (isAssistant) {
    return (
      <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <Avatar className="h-10 w-10 shrink-0 transition-all duration-300 hover:scale-110 ring-2 ring-blue-400/30">
          <AvatarImage src={chatbot.src} alt="Bot Avatar" />
          <AvatarFallback className="transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>

                <div className="flex flex-col gap-1 max-w-[80%]">
          <div className="text-sm px-1 text-gray-500 font-medium">
            Smart Farm Bot - Trợ lý AI Nông nghiệp thông minh
          </div>
          <div className="rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl relative overflow-hidden bg-white/80 text-gray-800 border border-gray-200 hover:bg-white/90 shadow-blue-100/50">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              {typeof children === 'string' ? (
                <MarkdownRenderer content={children} />
              ) : (
                <div className="prose prose-sm max-w-none text-inherit break-words">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User message - aligned to the right
  return (
    <div className="flex items-start gap-3 justify-end animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col gap-1 max-w-[80%] items-end">
        <div className="text-xs px-1 text-gray-600 font-medium">
          Bạn
        </div>
        <div className="rounded-xl px-4 py-3 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-purple-200/50">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="relative z-10">
            {typeof children === 'string' ? (
              <div className="text-base leading-relaxed break-words">
                {children}
              </div>
            ) : (
              <div className="text-base leading-relaxed break-words">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>

      <Avatar className="h-8 w-8 shrink-0 transition-all duration-300 hover:scale-110 ring-2 ring-purple-400/30">
        <AvatarFallback className="transition-all duration-300 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
