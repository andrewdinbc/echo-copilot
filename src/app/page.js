'use client'

import React, { useState, useCallback } from 'react'
import { useConversationStore } from '@/store/conversationStore'
import { Header } from '@/components/Header'
import { ConversationContainer } from '@/components/ConversationContainer'
import { ChatInput } from '@/components/ChatInput'
import { SettingsModal } from '@/components/SettingsModal'
import { LoadingSpinner } from '@/components/LoadingSpinner'

export default function Page() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const messages = useConversationStore((state) => state.messages)
  const isLoading = useConversationStore((state) => state.isLoading)
  const addMessage = useConversationStore((state) => state.addMessage)
  const setLoading = useConversationStore((state) => state.setLoading)
  const updateLastMessage = useConversationStore((state) => state.updateLastMessage)
  const clearMessages = useConversationStore((state) => state.clearMessages)

  const handleSendMessage = useCallback(
    async (userInput) => {
      // Add user message
      addMessage('user', userInput)

      // Add placeholder assistant message
      addMessage('assistant', '')
      setLoading(true)

      try {
        const messagesToSend = messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

        messagesToSend.push({
          role: 'user',
          content: userInput,
        })

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: messagesToSend }),
        })

        if (!response.ok) {
          throw new Error('Failed to get response')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let fullResponse = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          fullResponse += chunk
          updateLastMessage(fullResponse)
        }
      } catch (error) {
        console.error('Error:', error)
        updateLastMessage('Sorry, I encountered an error. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    [messages, addMessage, setLoading, updateLastMessage]
  )

  const handleClear = () => {
    if (window.confirm('Clear all messages? This action cannot be undone.')) {
      clearMessages()
    }
  }

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      <Header onClear={handleClear} onSettings={() => setSettingsOpen(true)} />

      <ConversationContainer messages={messages} isLoading={isLoading} />

      {isLoading && <LoadingSpinner />}

      <div className="border-t border-slate-700 bg-slate-800/50 backdrop-blur p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
          <p className="text-xs text-slate-500 mt-2 text-center">
            Echo remembers your conversation context
          </p>
        </div>
      </div>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}
