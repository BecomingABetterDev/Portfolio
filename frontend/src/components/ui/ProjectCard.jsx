import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiZap,
  FiGithub,
  FiArrowUpRight,
} from "react-icons/fi";

const STATUS_CONFIG = {
  Active: {
    icon: FiZap,
    color: "text-gray-400",
    bg: "bg-gray-400/10",
    border: "border-gray-400/30",
  },
  Completed: {
    icon: FiCheckCircle,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/30",
  },
  "In Progress": {
    icon: FiClock,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/30",
  },
};

/**
 * ProjectCard — used in home preview and full project list
 * @param {boolean} expanded - if true, shows full details
 */
export default function ProjectCard({ project, expanded = false }) {
  const statusCfg = STATUS_CONFIG[project.status] || STATUS_CONFIG.Completed;
  const Icon = statusCfg.icon;

  return (
    <article
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-all duration-300 card-lift flex flex-col justify-between"
      data-project-id={project._id}
    >
      <div>
        {/* System Tag + Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span
            className="text-gray-400 text-xs font-mono uppercase tracking-wider"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {project.systemTag}
          </span>
          <div
            className={`flex items-center gap-1.5 px-2 py-1 rounded border ${statusCfg.bg} ${statusCfg.border}`}
          >
            <Icon
              className={statusCfg.color}
              size={12}
            />
            <span className={`text-xs font-mono ${statusCfg.color}`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* ─── STEP 4.1: RESPONSIVE ASPECT-RATIO CAPPED IMAGE CONTAINER ─── */}
        {project.imageUrl && (
          <div className="mb-4 overflow-hidden rounded-md border border-gray-700 bg-gray-900/50 aspect-video w-full">
            <img
              src={project.imageUrl}
              alt={`${project.name} environment matrix preview`}
              className="w-full h-1/5 object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}

        {/* Name */}
        <h3
          className="text-white text-xl md:text-2xl font-bold mb-3 leading-tight"
          style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {expanded ? project.fullDescription : project.shortDescription}
        </p>

        {/* Tech Stack Tags */}
        {project.techStackTags && project.techStackTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStackTags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-mono text-gray-300 bg-gray-900/20 border border-gray-700/30 px-2 py-1 rounded"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Architecture highlights (if expanded) */}
        {expanded &&
          project.architectureHighlights &&
          project.architectureHighlights.length > 0 && (
            <div className="mt-5 pt-5 border-t border-gray-500 mb-2">
              <p className="text-gray-200 text-xs font-mono uppercase tracking-wider mb-3">
                Architecture Highlights
              </p>
              <ul className="space-y-2">
                {project.architectureHighlights.map((hl, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2"
                  >
                    <span className="text-gray-400 mt-1.5 flex-shrink-0">
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="currentColor"
                      >
                        <circle
                          cx="2"
                          cy="2"
                          r="2"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-300 text-xs leading-relaxed">
                      {hl}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>

      {/* ─── STEP 4.2: STANDALONE REPOSITORY ACTION BUTTON ─── */}
      {project.githubLink && (
        <div className="mt-5 pt-4 border-t border-gray-700/40 flex justify-end">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider text-gray-400 border border-gray-500/30 bg-gray-500/5 hover:bg-gray-500/10 hover:border-gray-400 transition-all duration-200 focus:outline-none"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <FiGithub size={13} />
            <span>Source Code</span>
            <FiArrowUpRight
              size={11}
              className="opacity-50 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
      )}
    </article>
  );
}
