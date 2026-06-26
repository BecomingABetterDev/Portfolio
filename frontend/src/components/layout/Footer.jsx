import React from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { OWNER } from '../../data/staticData'

export default function Footer({ setCurrentView }) {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left — identity */}
          <div>
            <p
              className="text-white font-semibold text-base mb-1"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              Eyob Desalegn
            </p>
            <p className="text-gray-500 text-sm font-mono">{OWNER.role}</p>
          </div>

          {/* Center — nav shortcuts */}
          <ul className="flex items-center gap-6">
            {['home', 'projects', 'contact'].map((v) => (
              <li key={v}>
                <button
                  onClick={() => {
                    setCurrentView(v)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="text-gray-500 hover:text-cyan-400 text-sm capitalize transition-colors duration-200 focus:outline-none"
                >
                  {v}
                </button>
              </li>
            ))}
          </ul>

          {/* Right — social links */}
          <div className="flex items-center gap-4">
            <a
              href={OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors duration-200"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={`mailto:${OWNER.email}`}
              className="text-gray-500 hover:text-cyan-400 transition-colors duration-200"
              aria-label="Email"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-mono">
            {`© ${new Date().getFullYear()} Eyob Desalegn. Built with React & Node.js.`}
          </p>
          <p className="text-gray-700 text-xs font-mono">{OWNER.location}</p>
        </div>
      </div>
    </footer>
  )
}
