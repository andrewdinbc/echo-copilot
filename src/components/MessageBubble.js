'use client'

import React from 'react'
import { User, Zap } from 'lucide-react'

export function MessageBubble({ message, isStreaming }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
      )}

      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-800 text-slate-100 border border-slate-700'
        }`}
      >
        <p className="text-sm leading-relaxed">
          {message.content}
          {isStreaming && <span className="ml-1 animate-pulse">▌</span>}
        </p>
        <span className="text-xs opacity-50 mt-2 block">
          {message.timestamp?.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
          <User className="w-4 h-4 text-emerald-400" />
        </div>
      )}
    </div>
  )
}
