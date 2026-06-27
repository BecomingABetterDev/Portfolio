import React from "react";
import { FiAward, FiExternalLink } from "react-icons/fi";

export default function CertBadge({ cert }) {
  return (
    <a
      href={cert.verificationUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between p-3 bg-gray-950/40 border border-gray-900 hover:border-cyan-500/50 rounded-lg transition-all duration-200 block cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-950/30 text-cyan-400 rounded border border-cyan-900/30 group-hover:bg-cyan-500 group-hover:text-gray-950 transition-all duration-200">
          <FiAward size={14} />
        </div>
        <div className="text-left">
          <h4 className="text-white text-xs font-semibold font-mono tracking-wide group-hover:text-cyan-400 transition-colors">
            {cert.title}
          </h4>
          <p className="text-[10px] text-gray-500 font-sans mt-0.5">
            {cert.issuer} • {cert.date}
          </p>
        </div>
      </div>

      {/* Subtle indicator showing this is a verified interactive link */}
      <FiExternalLink
        size={11}
        className="text-gray-600 group-hover:text-cyan-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
      />
    </a>
  );
}
