import React from "react";
import { FiAward, FiExternalLink } from "react-icons/fi";

export default function CertBadge({ cert }) {
  console.log(cert);
  return (
    <a
      href={cert.verificationUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between p-3 bg-gray-900/40 border border-gray-900 hover:border-gray-500/50 rounded-lg transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-950/30 text-gray-400 rounded border border-gray-900/30 group-hover:bg-yellow-400 group-hover:text-gray-700 transition-all duration-200">
          <FiAward size={14} />
        </div>
        <div className="text-left">
          <h4 className="text-white text-xs font-semibold font-mono tracking-wide group-hover:text-gray-400 transition-colors">
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
        className="text-gray-600 group-hover:text-gray-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
      />
    </a>
  );
}
