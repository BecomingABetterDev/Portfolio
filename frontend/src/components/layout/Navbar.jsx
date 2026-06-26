import React, { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Home', view: 'home' },
  { label: 'Projects', view: 'projects' },
  { label: 'Contact', view: 'contact' },
]

export default function Navbar({ currentView, setCurrentView }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = (view) => {
    setCurrentView(view)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-900 bg-opacity-95 border-b border-gray-800 shadow-lg'
          : 'bg-gray-900 bg-opacity-85'
      }`}
      style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 group focus:outline-none"
          aria-label="Go to home"
        >
          <span className="w-7 h-7 rounded border border-cyan-500 flex items-center justify-center">
            <span className="text-cyan-400 font-mono text-sm font-semibold">E</span>
          </span>
          <span
            className="font-display font-semibold text-white text-base tracking-tight group-hover:text-cyan-400 transition-colors duration-200"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Eyob Desalegn
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, view }) => (
            <li key={view}>
              <button
                onClick={() => navigate(view)}
                className={`relative text-sm font-medium transition-colors duration-200 focus:outline-none pb-1 ${
                  currentView === view
                    ? 'text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-px bg-cyan-500 transition-transform duration-200 origin-left ${
                    currentView === view ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block w-5 h-px bg-gray-300 transition-all duration-200 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-gray-300 transition-all duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-gray-300 transition-all duration-200 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(({ label, view }) => (
              <li key={view}>
                <button
                  onClick={() => navigate(view)}
                  className={`text-sm font-medium w-full text-left transition-colors duration-200 ${
                    currentView === view ? 'text-cyan-400' : 'text-gray-400'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
