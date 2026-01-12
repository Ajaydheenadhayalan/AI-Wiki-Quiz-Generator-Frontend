const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

async function handleResponse(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(err.detail || 'Request failed')
  }
  return res.json()
}

export async function generateQuiz(url) {
  const res = await fetch(`${API_BASE}/generate_quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
  return handleResponse(res)
}

export async function previewUrl(url) {
  const res = await fetch(`${API_BASE}/preview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
  return handleResponse(res)
}

export async function getHistory() {
  const res = await fetch(`${API_BASE}/history`)
  return handleResponse(res)
}

export async function getQuizById(id) {
  const res = await fetch(`${API_BASE}/quiz/${id}`)
  return handleResponse(res)
}

export async function getCacheStats() {
  const res = await fetch(`${API_BASE}/cache/stats`)
  return handleResponse(res)
}
