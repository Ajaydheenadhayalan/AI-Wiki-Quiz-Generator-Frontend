import React from 'react'

export default function Hero(){
  return (
    <section className="mb-8">
      <div className="card relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-teal-300/20 blur-3xl pointer-events-none" />
        <div className="md:flex items-center gap-8 relative">
          <div className="md:w-3/5">
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Create high-quality quizzes from Wikipedia in seconds
            </h1>
            <p className="text-white/70 mt-3">
              Scrape, summarize, and generate 5–10 MCQs with difficulty labels,
              then store and review results — all in one sleek interface.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="tag">FastAPI</span>
              <span className="tag">PostgreSQL</span>
              <span className="tag">Gemini</span>
              <span className="tag">React</span>
            </div>
          </div>
          <div className="md:w-2/5 mt-6 md:mt-0">
            <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
              <ul className="space-y-2 text-sm">
                <li className="text-white/80">• Paste a Wikipedia URL</li>
                <li className="text-white/80">• Generate JSON-valid quiz</li>
                <li className="text-white/80">• Save & browse history</li>
                <li className="text-white/80">• Review details anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
