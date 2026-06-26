import React from 'react'

export default function SkillBadge({ skill }) {
  return (
    <span
      className="inline-block px-3 py-1 bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded hover:border-cyan-500 hover:text-cyan-300 transition-all duration-200 cursor-default"
      style={{ fontFamily: 'JetBrains Mono, Fira Code, monospace' }}
    >
      {skill}
    </span>
  )
}
