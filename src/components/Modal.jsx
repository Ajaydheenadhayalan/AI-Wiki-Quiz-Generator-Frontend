import React from 'react'

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0f1621]/95 backdrop-blur-xl p-6 shadow-2xl animate-[fadeUp_.25s_ease-out]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="btn btn-ghost" onClick={onClose}>✕</button>
        </div>
        <div className="max-h-[70vh] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
