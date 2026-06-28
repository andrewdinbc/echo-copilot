'use client'

import React, { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'

export function ConversationContainer({ messages, isLoading }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">
              Echo Copilot
            </h2>
            <p className="text-slate-400 max-w-sm">
              Your personal AI companion ready to help, support, and chat
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 py-4">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          isStreaming={isLoading && index === messages.length - 1 && message.role === 'assistant'}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
