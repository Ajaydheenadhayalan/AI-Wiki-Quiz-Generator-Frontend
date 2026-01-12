import React from 'react'

export default function Navbar() {
  return (
    <header className="backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10 sticky top-0 z-40">
      <div className="page-wrap h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="h-8 w-8 rounded-xl object-cover" />
          <div className="font-semibold tracking-tight">AI Wiki Quiz Generator</div>
        </div>
        <nav className="hidden sm:flex items-center gap-4 text-sm">
          <a href="#" className="btn btn-primary text-sm">Home</a>
        </nav>
      </div>
    </header>
  )
}
