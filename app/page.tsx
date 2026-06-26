'use client'

import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/portfolio/Navbar'
import Footer from '@/components/portfolio/Footer'
import HomeView from '@/components/portfolio/HomeView'
import ProjectsView from '@/components/portfolio/ProjectsView'
import ContactView from '@/components/portfolio/ContactView'
import AdminView from '@/components/portfolio/AdminView'

type View = 'home' | 'projects' | 'contact' | 'admin'

export default function PortfolioPage() {
  const [currentView, setCurrentView] = useState<View>('home')

  // Secret admin trigger: Ctrl+Shift+A (or Cmd+Shift+A on Mac)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        setCurrentView((v) => (v === 'admin' ? 'home' : 'admin'))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#f9fafb',
            border: '1px solid #374151',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-mono)',
          },
          success: { iconTheme: { primary: '#06b6d4', secondary: '#111827' } },
          error: { iconTheme: { primary: '#f87171', secondary: '#111827' } },
        }}
      />

      {currentView !== 'admin' && (
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      )}

      <main>
        {currentView === 'home' && (
          <HomeView setCurrentView={setCurrentView} />
        )}
        {currentView === 'projects' && (
          <ProjectsView />
        )}
        {currentView === 'contact' && (
          <ContactView />
        )}
        {currentView === 'admin' && (
          <AdminView setCurrentView={setCurrentView} />
        )}
      </main>

      {currentView !== 'admin' && <Footer setCurrentView={setCurrentView} />}
    </>
  )
}
