import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({children}){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1">
        <div className="surface-ambient">
          <div className="page-wrap py-8 pb-12">
            {children}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
