import React, { useEffect, useState } from 'react'
import { getHistory, getQuizById } from '../services/api'
import Modal from '../components/Modal'
import QuizDisplay from '../components/QuizDisplay'

export default function HistoryTab(){
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const load = async () => {
    const res = await getHistory()
    setRows(res)
  }

  useEffect(()=>{ load() }, [])

  const show = async (id) => {
    const d = await getQuizById(id)
    setSelected(d); setOpen(true)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">History</h3>
        <button onClick={load} className="btn btn-ghost">Refresh</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>URL</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td className="text-white/70">{r.id}</td>
                <td>{r.title}</td>
                <td className="max-w-[320px] truncate text-white/70">{r.url}</td>
                <td className="text-white/70">{new Date(r.date_generated).toLocaleString()}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>show(r.id)}>Details</button>
                </td>
              </tr>
            ))}
            {rows.length===0 && (
              <tr><td colSpan="5" className="py-8 text-center text-white/60">No quizzes yet — generate your first one!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={selected?.title || 'Quiz'}>
        <QuizDisplay data={selected} />
      </Modal>
    </div>
  )
}
