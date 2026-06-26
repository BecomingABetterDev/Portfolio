import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiMapPin,
  FiMail,
  FiTerminal,
  FiCpu,
  FiActivity,
} from "react-icons/fi";
import SectionHeading from "../components/ui/SectionHeading";
import CertBadge from "../components/ui/CertBadge";
import SkillBadge from "../components/ui/SkillBadge";
import ProjectCard from "../components/ui/ProjectCard";
import { OWNER, CERTIFICATIONS, SKILLS } from "../data/staticData";
import { useProjects } from "../hooks/useProjects";

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

  // Dynamic time-period greeting determination function
  const [greeting, setGreeting] = useState(() => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 17) return "Good afternoon";
    return "Good evening";
  });

  return (
    <div className="view-enter">
      {/* ─── MODERNIZED HERO SECTION ─── */}
      <section
        className="relative min-h-screen flex items-center grid-bg overflow-hidden border-b border-gray-800/60"
        style={{ paddingTop: "80px" }}
      >
        {/* Modern Ambient Radial Glow Blobs */}
        <div
          className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 left-[-5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Decorative Grid SVG Elements */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            className="absolute top-1/4 right-12 w-64 h-64 text-cyan-500 opacity-[0.03]"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="100"
              x2="200"
              y2="100"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="0"
              x2="100"
              y2="200"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Typography & Content Summary */}
            <div className="lg:col-span-7 space-y-6">
              {/* Premium Pill Greeting Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-gray-300 font-mono text-xs tracking-wide">
                  {greeting}, welcome · Available for collaboration
                </span>
              </div>

              {/* Sophisticated Name Display */}
              <div>
                <h1
                  className="text-5xl md:text-7xl font-bold text-white leading-tight"
                  style={{
                    fontFamily: "Space Grotesk, Inter, sans-serif",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Eyob <span className="text-cyan-400">Desalegn</span>
                </h1>
                <p className="text-gray-400 font-mono text-sm md:text-base tracking-wide mt-2 border-l-2 border-cyan-500/30 pl-3">
                  {OWNER.role}
                </p>
              </div>

              {/* Status and Location Grid */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <FiCpu
                    className="text-cyan-500/70"
                    size={12}
                  />
                  {OWNER.academicStatus}
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin
                    className="text-cyan-500/70"
                    size={12}
                  />
                  {OWNER.location}
                </div>
              </div>

              {/* Core System Statements */}
              <div className="space-y-4 max-w-xl pt-2">
                {OWNER.heroStatement.map((line, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed ${
                      i === 0
                        ? "text-gray-200 text-lg font-medium tracking-tight"
                        : "text-gray-400 text-sm md:text-base"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Interactive Micro-Translation Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => setCurrentView("projects")}
                  className="group flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold text-sm rounded transition-all duration-200 focus:outline-none transform hover:-translate-y-0.5"
                >
                  View Projects
                  <FiArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
                <button
                  onClick={() => setCurrentView("contact")}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-white font-medium text-sm rounded transition-all duration-200 focus:outline-none backdrop-blur-xs transform hover:-translate-y-0.5"
                >
                  <FiMail size={15} />
                  Contact Me
                </button>
              </div>
            </div>

            {/* Right Column: High-End Telemetry Card Mockup (Shows Dev Prowess) */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-gray-800/30 border border-gray-800 rounded-xl p-5 font-mono text-xs text-gray-400 space-y-4 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-gray-700/60 transition-colors duration-300">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

                {/* Window Controls */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  </div>
                  <span className="text-[10px] text-gray-600 tracking-widest uppercase flex items-center gap-1">
                    <FiTerminal size={10} /> core_engine.sh
                  </span>
                </div>

                {/* Simulated Logs */}
                <div className="space-y-2 text-[11px] leading-relaxed">
                  <p className="text-gray-500">
                    # Initializing offline mutation queues...
                  </p>
                  <p className="text-green-400 flex items-center gap-1.5">
                    <FiActivity
                      size={10}
                      className="animate-pulse"
                    />{" "}
                    [OK] IndexedDB Buffer connection initialized.
                  </p>
                  <p className="text-gray-500">
                    # Evaluating local memory constraints...
                  </p>
                  <p className="text-cyan-400">
                    [INFO] Optimization profile active: low latency
                    prioritization.
                  </p>
                  <p className="text-white">
                    eyob@portfolio:~$ run systems-check
                  </p>
                </div>

                {/* Visual Architecture Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-800/80 text-[10px]">
                  <div className="p-2 rounded bg-gray-900/40 border border-gray-800/50">
                    <p className="text-gray-600 uppercase tracking-wider mb-0.5">
                      DB LAYER
                    </p>
                    <p className="text-gray-200 font-semibold">
                      MongoDB Atlas Connected
                    </p>
                  </div>
                  <div className="p-2 rounded bg-gray-900/40 border border-gray-800/50">
                    <p className="text-gray-600 uppercase tracking-wider mb-0.5">
                      STATE MANAGEMENT
                    </p>
                    <p className="text-gray-200 font-semibold">
                      Offline-First Service Workers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS STRIP ─── */}
      <section className="py-16 reveal">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-6">
            Verified Certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {CERTIFICATIONS.map((cert) => (
              <CertBadge
                key={cert.id}
                cert={cert}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section className="py-16 border-t border-gray-800 reveal">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            label="Capabilities"
            title="Skills & Stack"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS.map((group) => (
              <div key={group.category}>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-4">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATUREV PROJECTS ─── */}
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
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm group transition-colors duration-200 focus:outline-none"
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
