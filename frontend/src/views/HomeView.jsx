import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiMapPin,
  FiMail,
  FiTerminal,
  FiCpu,
  FiActivity,
  FiLayers,
  FiCode,
} from "react-icons/fi";
import SectionHeading from "../components/ui/SectionHeading";
import CertBadge from "../components/ui/CertBadge";
import SkillBadge from "../components/ui/SkillBadge";
import ProjectCard from "../components/ui/ProjectCard";
import { OWNER, CERTIFICATIONS, SKILLS } from "../data/staticData";
import { useProjects } from "../hooks/useProjects";

// Authentic High-Fidelity Official Multi-Color Brand Vectors
const BRAND_LOGOS = {
  react: (
    <svg
      className="w-5 h-5"
      viewBox="-11.5 -10.23174 23 20.46348"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="0"
        cy="0"
        r="2.05"
        fill="#61dafb"
      />
      <g
        stroke="#61dafb"
        strokeWidth="1"
        fill="none"
      >
        <ellipse
          rx="11"
          ry="4.2"
        />
        <ellipse
          rx="11"
          ry="4.2"
          transform="rotate(60)"
        />
        <ellipse
          rx="11"
          ry="4.2"
          transform="rotate(120)"
        />
      </g>
    </svg>
  ),
  tailwind: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#38bdf8"
    >
      <path d="M12 6.086c-2.43 0-3.957 1.217-4.582 3.652 1.218-1.218 2.587-1.522 4.109-.913 1.096.439 1.879 1.246 2.746 2.137 1.413 1.458 3.053 3.152 7.03 3.152 2.43 0 3.957-1.217 4.582-3.652-1.218 1.218-2.587 1.522-4.109.913-.822-.33-1.428-.953-2.14-1.681-.973-.997-2.158-2.21-5.136-2.21zM4.582 13.391C2.152 13.391.712 14.609.087 17.043c1.217-1.217 2.586-1.522 4.108-.913 1.096.439 1.879 1.246 2.746 2.137 1.413 1.458 3.053 3.152 7.03 3.152 2.43 0 3.957-1.217 4.582-3.652-1.218 1.218-2.587 1.522-4.109.913-.822-.33-1.428-.953-2.14-1.681-.973-.997-2.158-2.21-5.136-2.21z" />
    </svg>
  ),
  vite: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="vite-logo-grad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="#4158D0"
          />
          <stop
            offset="50%"
            stopColor="#C850C0"
          />
          <stop
            offset="100%"
            stopColor="#FFCC70"
          />
        </linearGradient>
      </defs>
      <path
        d="M30 6l-14 24-14-24h28z"
        fill="url(#vite-logo-grad)"
      />
      <path
        d="M16 30l8-22h-16l8 22z"
        fill="#FFD600"
      />
    </svg>
  ),
  workers: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#F48120"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  db: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#00758F"
    >
      <path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 3c3.87 0 7 1.34 7 3s-3.13 3-7 3-7-1.34-7-3 3.13-3 7-3z" />
    </svg>
  ),
  node: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#339933"
    >
      <path d="M12 2L2.5 7.5v11L12 22l9.5-5.5v-11L12 2zm1 17.76v-5.24l4.5-2.6v5.24l-4.5 2.6zm-2 0l-4.5-2.6v-5.24l4.5 2.6v5.24zm-5.5-9.34l4.5-2.6 4.5 2.6-4.5 2.6-4.5-2.6z" />
    </svg>
  ),
  express: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#E1E1E1"
    >
      <text
        x="50%"
        y="62%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontWeight="bold"
        fontSize="9"
        fontFamily="sans-serif"
      >
        EX
      </text>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#E1E1E1"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  ),
  mongodb: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#47A248"
    >
      <path d="M12 1.5c-.3 0-.5.2-.5.5v2.3C9.3 5.3 6.5 8.4 6.5 12c0 3.9 3 6.9 5.5 8.2v2.3c0 .3.2.5.5.5s.5-.2.5-.5v-2.3c2.5-1.3 5.5-4.3 5.5-8.2 0-3.6-2.8-6.7-5-7.7V2c0-.3-.2-.5-.5-.5zm0 4.2c2.1.9 4 3.4 4 6.3 0 3-2.1 5.4-4 6.6V5.7z" />
    </svg>
  ),
  figma: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 24c2.2 0 4-1.8 4-4v-4h-4c-2.2 0-4 1.8-4 4s1.8 4 4 4z"
        fill="#0ACF83"
      />
      <path
        d="M4.5 12c0-2.2 1.8-4 4-4h4v8h-4c-2.2 0-4-1.8-4-4z"
        fill="#A259FF"
      />
      <path
        d="M4.5 4c0-2.2 1.8-4 4-4h4v8h-4c-2.2 0-4-1.8-4-4z"
        fill="#F24E1E"
      />
      <path
        d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z"
        fill="#FF7262"
      />
      <path
        d="M12 8h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V8z"
        fill="#1ABC9C"
      />
    </svg>
  ),
};

const BALANCED_STACK = [
  {
    category: "Frontend Layer",
    description: "Highly interactive state architectures & render engines.",
    icon: (
      <FiLayers
        className="text-cyan-400"
        size={14}
      />
    ),
    gridClass: "lg:col-span-5",
    innerGrid: "grid-cols-2",
    items: [
      { id: "react", name: "React Engine" },
      { id: "tailwind", name: "Tailwind CSS" },
      { id: "vite", name: "Vite Bundler" },
      { id: "workers", name: "Service Workers" },
      { id: "db", name: "IndexedDB" },
    ],
  },
  {
    category: "Backend & Systems",
    description: "Data orchestration layers & backend structures.",
    icon: (
      <FiCode
        className="text-emerald-400"
        size={14}
      />
    ),
    gridClass: "lg:col-span-4",
    innerGrid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-1",
    items: [
      { id: "node", name: "Node.js Runtime" },
      { id: "express", name: "Express Framework" },
      { id: "mongodb", name: "MongoDB Matrix" },
    ],
  },
  {
    category: "Design Systems",
    description: "Visual system architecture.",
    icon: (
      <FiActivity
        className="text-amber-400"
        size={14}
      />
    ),
    gridClass: "lg:col-span-3",
    innerGrid: "grid-cols-1",
    items: [{ id: "figma", name: "Figma UI Systems" }],
  },
];

function useRevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function HomeView({ setCurrentView }) {
  useRevealOnScroll();
  const { projects } = useProjects();
  const featured = projects.slice(0, 3);

  const [greeting] = useState(() => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 17) return "Good afternoon";
    return "Good evening";
  });

  return (
    <div
      className="view-enter"
      style={{ paddingTop: "40px" }}
    >
      {/* ─── ORIGINAL INITIAL HERO SECTION ─── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 reveal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column — Core Info */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <h2 className="text-gray-400 font-mono text-sm tracking-wide mb-1">
                {greeting}, I'm
              </h2>
              <h1
                className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
                style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
              >
                {OWNER.name}
              </h1>
              <p className="text-cyan-400 font-mono text-xs sm:text-sm mt-1.5 tracking-wide">
                {OWNER.role}
              </p>
            </div>

            <div className="space-y-3 text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl font-sans">
              {OWNER.heroStatement.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Telemetry metadata block */}
            <div className="pt-4 border-t border-gray-900 flex flex-wrap items-center gap-6 text-gray-500 font-mono text-xs">
              <span className="flex items-center gap-1.5">
                <FiMapPin className="text-gray-600" /> {OWNER.location}
              </span>
              <span className="flex items-center gap-1.5">
                <FiCpu className="text-gray-600" /> {OWNER.academicStatus}
              </span>
              <a
                href={`mailto:${OWNER.email}`}
                className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <FiMail /> Establish Contact
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  setCurrentView("projects");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-mono font-semibold text-xs uppercase tracking-wider rounded transition-all cursor-pointer focus:outline-none"
              >
                Explore System Metrics <FiArrowRight size={14} />
              </button>
              <button
                onClick={() => {
                  setCurrentView("contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-5 py-2.5 border border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white font-mono text-xs uppercase tracking-wider rounded transition-all cursor-pointer focus:outline-none"
              >
                Establish Link
              </button>
            </div>
          </div>

          {/* Right Column — Certifications */}
          <div className="lg:col-span-5 bg-gray-900/20 border border-gray-800/60 rounded-xl p-6 backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 mb-4 text-gray-400 font-mono text-xs uppercase tracking-widest border-b border-gray-900 pb-3">
              <FiTerminal className="text-cyan-500" /> System Credentials
            </div>
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <CertBadge
                  key={cert.id}
                  cert={cert}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── HIGH-FIDELITY TECHNOLOGY DECK SECTION (ASYMMETRICAL BACKED ARCHITECTURE) ─── */}
      <section className="py-16 border-t border-gray-900 bg-gray-950/40 reveal">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 text-left">
            <p className="text-cyan-500 font-mono text-xs tracking-widest uppercase mb-1">
              // CORE_ENGINE_CAPABILITIES
            </p>
            <h2
              className="text-2xl font-bold tracking-tight text-white"
              style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
            >
              Core Technology Deck
            </h2>
            <div className="mt-2 w-10 h-0.5 bg-cyan-500" />
          </div>

          {/* Asymmetrical Grid: Solves layout gaps and empty column space */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {BALANCED_STACK.map((category, idx) => (
              <div
                key={idx}
                className={`${category.gridClass} bg-gray-900/30 border border-gray-800/80 rounded-xl p-5 flex flex-col transition-all duration-300 hover:border-gray-700/60`}
              >
                {/* Header Container - Spacing optimized */}
                <div className="mb-4 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    {category.icon}
                    <h3 className="text-white font-semibold font-mono text-xs uppercase tracking-wide">
                      {category.category}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-[11px] font-sans leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Micro-Card Dynamic Grid Layer */}
                <div className={`grid ${category.innerGrid} gap-2 mt-auto`}>
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2.5 p-2.5 bg-gray-950/50 border border-gray-900 hover:border-gray-800/80 rounded-lg group transition-all"
                    >
                      <div className="flex-shrink-0 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] transform group-hover:scale-105 transition-transform duration-200">
                        {BRAND_LOGOS[item.id]}
                      </div>
                      <span className="font-mono text-[11px] text-gray-400 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ORIGINAL STARTER FEATURED PROJECTS SECTION ─── */}
      <section className="py-16 border-t border-gray-800 reveal">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            label="Selected Work"
            title="Featured Projects"
            subtitle="Systems built to solve real problems — not exercises."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                expanded={false}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => {
                setCurrentView("projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm group transition-colors duration-200 focus:outline-none cursor-pointer"
            >
              See All Projects
              <FiArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
