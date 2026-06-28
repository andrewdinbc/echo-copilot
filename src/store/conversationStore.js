import { create } from 'zustand'

export const useConversationStore = create((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  
  addMessage: (role, content) => set((state) => ({
    messages: [...state.messages, { id: Date.now(), role, content, timestamp: new Date() }],
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  clearMessages: () => set({ messages: [] }),

  updateLastMessage: (content) => set((state) => ({
    messages: state.messages.map((msg, idx) => 
      idx === state.messages.length - 1 
        ? { ...msg, content }
        : msg
    ),
  })),
}))
