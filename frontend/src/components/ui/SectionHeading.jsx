import React from 'react'

/**
 * SectionHeading — consistent h2-level heading with accent underline
 * @param {string} label - small pre-label in mono (e.g. "01 /")
 * @param {string} title - main heading text
 * @param {string} subtitle - optional subtitle below
 */
export default function SectionHeading({ label, title, subtitle, className = '' }) {
  return (
    <div className={`mb-12 ${className}`}>
      {label && (
        <p className="text-cyan-500 font-mono text-xs tracking-widest uppercase mb-2">
          {label}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl font-bold text-white"
        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 mt-3 text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-4 w-12 h-0.5 bg-cyan-500" />
    </div>
  )
}
