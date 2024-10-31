import React from 'react'
import Header from '../../components/header/Header'

export default function LayoutDefault({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="W-full max-w-7xl mt-15 mx-auto">
          <Header />         
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

