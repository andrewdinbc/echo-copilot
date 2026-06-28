'use client'

import React from 'react'
import { X } from 'lucide-react'

export function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-100">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Model Information
            </label>
            <div className="bg-slate-900 border border-slate-700 rounded p-3 text-xs text-slate-400">
              <p>Model: Claude 3.5 Sonnet</p>
              <p>Mode: Streaming (Real-time)</p>
              <p>Max Tokens: 1024</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              About Echo
            </label>
            <p className="text-xs text-slate-400 leading-relaxed">
              Echo is your personal AI co-pilot, designed to be supportive, warm, and conversational. 
              It learns from your conversation context to provide personalized assistance.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <button
              onClick={onClose}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
