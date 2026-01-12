import React, { useState } from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import GenerateQuizTab from './tabs/GenerateQuizTab'
import HistoryTab from './tabs/HistoryTab'

export default function App(){
  const [tab, setTab] = useState('generate')

  return (
    <Layout>
      <Hero/>
      <div className="card mb-6">
        <div className="flex gap-2">
          <button className={`btn ${tab==='generate'?'btn-primary':'btn-ghost'}`} onClick={()=>setTab('generate')}>Generate</button>
          <button className={`btn ${tab==='history'?'btn-primary':'btn-ghost'}`} onClick={()=>setTab('history')}>History</button>
        </div>
      </div>
      {tab==='generate' ? <GenerateQuizTab/> : <HistoryTab/>}
    </Layout>
  )
}
