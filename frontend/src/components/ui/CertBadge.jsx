import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'

export default function CertBadge({ cert }) {
  return (
    <div className="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-cyan-500 transition-all duration-300 card-lift">
      <p className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-1">
        {cert.issuer}
      </p>
      <p
        className="text-white text-sm font-medium leading-snug mb-3"
        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
      >
        {cert.title}
      </p>
      {cert.verified && (
        <div className="flex items-center gap-1.5">
          <FiCheckCircle className="text-cyan-400" size={12} />
          <span className="text-cyan-400 text-xs font-mono">Verified</span>
        </div>
      )}
    </div>
  )
}
