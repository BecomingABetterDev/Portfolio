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

const LOGO_REGISTRY = BRAND_LOGOS;

const BALANCED_STACK = [
  {
    category: "Frontend Layer",
    description: "Highly interactive state architectures & render engines.",
    icon: (
      <FiLayers
        className="text-gray-400"
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

  const [displayedRole, setDisplayedRole] = useState("");

  useEffect(() => {
    let index = 0;
    const fullText = OWNER.role || "Web Developer";
    const interval = setInterval(() => {
      setDisplayedRole(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-950">
      {/* ─── MAIN HERO LAYER ─── */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 reveal view-enter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column — Core Bio Deck */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Professional Modern Profile Header row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-2">
              {/* 🎯 Integrated Cyberpunk Picture Frame */}
              <div className="relative group w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
                {/* Tech Accent Corner Decorators */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl z-10" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br z-10" />

                {/* Framing Slot */}
                <div className="w-full h-full rounded-xl overflow-hidden border border-gray-800 bg-gray-900/40 p-1.5 group-hover:border-cyan-500/30 transition-all duration-300 shadow-xl shadow-black/50">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="Eyob Desalegn"
                    className="w-full h-full object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Clean Typography Layout Block */}
              <div className="space-y-1">
                <h2 className="text-gray-400 font-mono text-sm tracking-wide">
                  <span className="text-lg text-yellow-400 font-bold">
                    {greeting}
                  </span>
                  , I'm
                </h2>
                <h1
                  className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
                >
                  {OWNER.name}
                </h1>
                <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-wider font-semibold pt-0.5">
                  {displayedRole}
                  <span className="blinking-cursor">|</span>
                </p>
              </div>
            </div>

            {/* Subtitle & Descriptive Texts */}
            <div className="space-y-3 text-gray-400 text-xs sm:text-base leading-relaxed max-w-xl font-display">
              <p className="font-bold text-base text-gray-300 font-roboto">
                {OWNER.subtitle}
              </p>
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
                target="_blank"
                className="flex items-center text-sm gap-1.5 text-gray-300 hover:text-gray-500 transition-colors"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-600 hover:bg-gray-400 text-gray-950 font-mono font-semibold text-xs uppercase tracking-wider card-lift rounded transition-all cursor-pointer focus:outline-none"
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

          {/* Right Column — Certifications Deck */}
          <div className="lg:col-span-5 bg-gray-900/20 border border-gray-800/60 rounded-xl p-6 backdrop-blur-sm text-left w-full">
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

      {/* ─── TECHNOLOGY DECK SECTION ─── */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-900 reveal">
        <div className="mb-10 text-left">
          <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mb-1">
            // ENGINE_CAPABILITIES
          </p>
          <h2
            className="text-2xl font-bold tracking-tight text-white"
            style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
          >
            Core Technology Deck
          </h2>
          <div className="mt-2 w-full h-0.5 bg-gray-900" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {BALANCED_STACK.map((category, idx) => (
            <div
              key={idx}
              className={`${category.gridClass} bg-gray-900/30 border border-gray-800/80 rounded-xl p-5 flex flex-col justify-start hover:border-gray-700/50 transition-colors`}
            >
              <div className="text-left mb-4">
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

              <div className={`grid ${category.innerGrid} gap-2`}>
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2.5 p-2.5 bg-gray-950/50 border border-gray-900 hover:border-gray-800 rounded-lg group transition-all"
                  >
                    <div className="flex-shrink-0 filter drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] transform group-hover:scale-105 transition-transform duration-200">
                      {LOGO_REGISTRY[item.id]}
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
      </section>

      {/* ─── FEATURED PROJECTS SECTION ─── */}
      <section className="py-16 border-t border-gray-900 reveal">
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
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 font-mono text-sm group transition-colors duration-200 focus:outline-none cursor-pointer"
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
