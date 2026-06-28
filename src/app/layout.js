import React from 'react'
import './globals.css'
import { Metadata } from 'next'

export const metadata = {
  title: 'Echo Copilot',
  description: 'Real-time conversational AI co-pilot',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-slate-900 text-slate-100">
        {children}
      </body>
    </html>
  )
}
