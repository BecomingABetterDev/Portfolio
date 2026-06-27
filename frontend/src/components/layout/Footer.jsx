import React from "react";
import { FiGithub, FiLinkedin, FiMail, FiActivity } from "react-icons/fi";

export default function Footer({ setCurrentView }) {
  const currentYear = new Date().getFullYear();

  const handleQuickLink = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gray-950 border-t border-gray-900/80 font-mono text-xs text-gray-500 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-left">
          {/* Identity Block */}
          <div className="space-y-3">
            <p className="text-white font-bold tracking-wider text-sm">
              EYOB DESALEGN<span className="text-cyan-400"> // PORTFOLIO</span>
            </p>
            <p className="text-[11px] leading-relaxed text-gray-500 font-sans max-w-xs">
              Engineered for absolute client-side speed, offline resilience, and
              modern, micro-detailed designs.
            </p>
          </div>

          {/* Quick Core Engine Routines */}
          <div className="space-y-2">
            <p className="text-gray-400 text-[11px] uppercase tracking-widest font-semibold">
              // ROUTINES
            </p>
            <div className="flex flex-col gap-1.5 items-start">
              <button
                onClick={() => handleQuickLink("home")}
                className="hover:text-cyan-400 transition-colors cursor-pointer text-[11px]"
              >
                sys.execute("load_home")
              </button>
              <button
                onClick={() => handleQuickLink("projects")}
                className="hover:text-cyan-400 transition-colors cursor-pointer text-[11px]"
              >
                sys.execute("load_projects")
              </button>
              <button
                onClick={() => handleQuickLink("contact")}
                className="hover:text-cyan-400 transition-colors cursor-pointer text-[11px]"
              >
                sys.execute("load_contact")
              </button>
            </div>
          </div>

          {/* System Environment Telemetry */}
          <div className="space-y-3 md:text-right md:flex md:flex-col md:items-end">
            <p className="text-gray-400 text-[11px] uppercase tracking-widest font-semibold w-full md:text-right">
              // ENVIRONMENT
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-gray-900/40 border border-gray-800">
              <FiActivity
                className="text-green-400 animate-pulse"
                size={12}
              />
              <span className="text-[10px] text-gray-400">
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>
        </div>

        {/* Lower Border & Connection Matrix */}
        <div className="mt-10 pt-6 border-t border-gray-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 font-sans">
            © {currentYear} Eyob Desalegn. Built with React Engine & Tailwind
            Matrix. All rights reserved.
          </p>

          {/* Core Network Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-900/30 hover:bg-gray-900 border border-gray-900 hover:border-gray-800 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-200"
              aria-label="GitHub Repository Access"
            >
              <FiGithub size={14} />
            </a>
            <a
              href="https://linkedin.com/in/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-900/30 hover:bg-gray-900 border border-gray-900 hover:border-gray-800 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-200"
              aria-label="LinkedIn Professional Vector"
            >
              <FiLinkedin size={14} />
            </a>
            <a
              href="mailto:your-email@example.com"
              className="p-2 bg-gray-900/30 hover:bg-gray-900 border border-gray-900 hover:border-gray-800 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-200"
              aria-label="Establish Direct SMTP Mail Connection"
            >
              <FiMail size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
