import React, { useState } from 'react'
import { generateQuiz, previewUrl } from '../services/api'
import QuizDisplay from '../components/QuizDisplay'

export default function GenerateQuizTab(){
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)
  const [previewing, setPreviewing] = useState(false)

  const handleUrlChange = async (e) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    setPreview(null)
    
    // Auto-preview if valid Wikipedia URL
    if (newUrl.includes('wikipedia.org/wiki/')) {
      setPreviewing(true)
      try {
        const result = await previewUrl(newUrl)
        setPreview(result)
      } catch (err) {
        // Silently fail preview
      } finally {
        setPreviewing(false)
      }
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true); setData(null)
    try {
      const res = await generateQuiz(url)
      setData(res)
      if (res.cached) {
        setError('✨ Loaded from cache (quiz already exists for this URL)')
      }
    } catch (err) {
      setError(err.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-5 gap-6">
      <div className="md:col-span-2">
        <div className="card">
          <h3 className="text-lg font-semibold">Generate a quiz</h3>
          <p className="text-white/60 text-sm mt-1">Paste any Wikipedia article URL and we'll create a quiz with 5–10 MCQs.</p>

          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <div>
              <input
                type="url"
                required
                placeholder="https://en.wikipedia.org/wiki/Alan_Turing"
                value={url}
                onChange={handleUrlChange}
                className="input"
              />
              {previewing && (
                <div className="mt-2 text-xs text-white/50 flex items-center gap-1">
                  <div className="loading-shimmer w-3 h-3 rounded-full" />
                  Validating URL...
                </div>
              )}
              {preview && !previewing && (
                <div className="mt-2 text-xs text-green-300 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {preview.title}
                </div>
              )}
            </div>
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="loading-shimmer w-4 h-4 rounded-full" />
                  Generating…
                </span>
              ) : 'Generate Quiz'}
            </button>
          </form>

          {error && (
            <div className={`mt-3 text-sm ${error.includes('cache') ? 'text-amber-300' : 'text-red-300'}`}>
              {error}
            </div>
          )}

          <hr className="sep" />

          <div className="text-xs text-white/60 space-y-2">
            <div className="font-semibold">Tips</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Try topics with rich text (biographies, technologies, history).</li>
              <li>If Wikipedia blocks the request, retry after a minute.</li>
              <li>Cached quizzes load instantly!</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="md:col-span-3">
        {!data && (
          <div className="card text-white/60 text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>Your quiz will appear here after generation.</p>
          </div>
        )}
        {data && <QuizDisplay data={data} />}
      </div>
    </div>
  )
}

