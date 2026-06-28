'use client'

import React from 'react'
import { RotateCcw, Settings } from 'lucide-react'

export function Header({ onClear, onSettings }) {
  return (
    <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-emerald-400">Echo</h1>
          <p className="text-xs text-slate-400">AI Copilot</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onSettings}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={onClear}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
            title="Clear conversation"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
