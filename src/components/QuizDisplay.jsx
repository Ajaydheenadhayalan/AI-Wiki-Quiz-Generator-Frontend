import React, { useState } from 'react'
import TakeQuizMode from './TakeQuizMode'

export default function QuizDisplay({ data }) {
  const [tab, setTab] = useState('overview')
  const [quizMode, setQuizMode] = useState(false)
  
  if (!data) return null

  if (quizMode) {
    return <TakeQuizMode data={data} onExit={() => setQuizMode(false)} />
  }

  return (
    <div className="card fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-semibold">{data.title}</h2>
            {data.cached && (
              <span className="cached-badge">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Cached
              </span>
            )}
          </div>
          <p className="text-white/60 text-sm">{data.url}</p>
        </div>
        <div className="flex gap-2">
          <button className={`btn ${tab==='overview'?'btn-primary':'btn-ghost'}`} onClick={()=>setTab('overview')}>Overview</button>
          <button className={`btn ${tab==='questions'?'btn-primary':'btn-ghost'}`} onClick={()=>setTab('questions')}>Questions</button>
          <button className="btn btn-success" onClick={() => setQuizMode(true)}>
            Take Quiz
          </button>
        </div>
      </div>

      {tab==='overview' && (
        <div className="mt-5 space-y-4">
          <p className="text-white/80 leading-relaxed">{data.summary}</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card">
              <div className="text-white/60 text-xs mb-1">People</div>
              <div className="mt-1 text-sm">{data.key_entities?.people?.join(', ') || '—'}</div>
            </div>
            <div className="card">
              <div className="text-white/60 text-xs mb-1">Organizations</div>
              <div className="mt-1 text-sm">{data.key_entities?.organizations?.join(', ') || '—'}</div>
            </div>
            <div className="card">
              <div className="text-white/60 text-xs mb-1">Locations</div>
              <div className="mt-1 text-sm">{data.key_entities?.locations?.join(', ') || '—'}</div>
            </div>
          </div>
          <div>
            <div className="text-white/60 text-xs mb-2">Sections</div>
            <div className="flex flex-wrap gap-2">
              {(data.sections||[]).map((s,i)=>(<span key={i} className="tag">{s}</span>))}
            </div>
          </div>
          {data.related_topics?.length>0 && (
            <div>
              <div className="text-white/60 text-xs mb-2">Related topics</div>
              <div className="flex flex-wrap gap-2">
                {data.related_topics.map((s,i)=>(<span key={i} className="tag">{s}</span>))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab==='questions' && (
        <div className="mt-5 space-y-4">
          {data.quiz?.map((q, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/[.04] p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="font-semibold">Q{idx+1}. {q.question}</h3>
                <span className={`tag difficulty-${q.difficulty}`}>{q.difficulty}</span>
              </div>
              <ul className="grid md:grid-cols-2 gap-2 mt-2">
                {q.options.map((opt,i)=>(
                  <li key={i} className="quiz-option disabled">{opt}</li>
                ))}
              </ul>
              <div className="mt-3 text-teal-200/90">
                <span className="font-semibold">Answer:</span> {q.answer}
              </div>
              <div className="text-white/70 text-sm mt-1">
                <span className="font-semibold">Explanation:</span> {q.explanation}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

