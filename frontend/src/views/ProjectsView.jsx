import React, { useEffect, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import ProjectCard from "../components/ui/ProjectCard";
import { useProjects } from "../hooks/useProjects";
import { PLAYGROUND_PROJECTS } from "../data/staticData";
import { FiCheckCircle, FiGithub } from "react-icons/fi";

function useRevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function ProjectsView() {
  useRevealOnScroll();
  const { projects, loading } = useProjects();
  const [showWakeUpNotice, setShowWakeUpNotice] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      // If system is loading, wait 4000ms (4 seconds) before displaying notice
      timer = setTimeout(() => {
        setShowWakeUpNotice(true);
      }, 4000);
    } else {
      // Reset immediately when loading drops to false
      setShowWakeUpNotice(false);
    }

    // Pro Cleanup: Prevents memory leaks and cancels timer if data loads quickly
    return () => clearTimeout(timer);
  }, [loading]);
  return (
    <div className="view-enter">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <SectionHeading
          label="02 / Work"
          title="Projects"
          subtitle="Production systems, constraint-driven engineering, and real deployment — not tutorial clones."
        />

        {/* Main Projects Grid */}
        <div className="space-y-6 reveal">
          {loading ? (
            /* Changed to flex-col to keep the spinner centered when text appears */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              {/* Spinner stays perfectly fixed in the center */}
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />

              {/* Dynamic Wake-up Message — Only renders if server takes > 4 seconds */}
              {showWakeUpNotice && (
                <p className="text-gray-500 font-mono text-[11px] tracking-wide mt-5 max-w-xs mx-auto leading-relaxed uppercase transition-all duration-500 ease-in-out opacity-80">
                  // establishing_cloud_link...
                  <span className="block text-gray-600 lowercase text-[10px] tracking-normal mt-1 font-sans">
                    Note: Free hosting nodes hibernate when idle. Initial
                    wake-up sequence may require up to 30 seconds.
                  </span>
                </p>
              )}
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                expanded={true}
              />
            ))
          )}
        </div>

        {/* ─── PLAYGROUND SECTION ─── */}
        <section className="mt-24 pt-16 border-t border-gray-800 reveal">
          <div className="mb-10">
            <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mb-2">
              Experimental Builds
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
            >
              The Playground
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              Contained builds that tested a specific browser mechanic, API
              pattern, or state architecture. Each one ended with a deliberate
              conclusion.
            </p>
            <div className="mt-4 w-8 h-px bg-gray-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PLAYGROUND_PROJECTS.map((p) => (
              <article
                key={p.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-5 flex flex-col justify-between min-h-[140px] hover:border-gray-500 transition-all duration-300 card-lift"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="text-white font-semibold text-sm"
                      style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
                    >
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      <FiCheckCircle
                        className="text-green-400"
                        size={12}
                      />
                      <span className="text-green-400 text-xs font-mono">
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs font-mono leading-relaxed">
                    Tested: {p.tested}
                  </p>
                </div>

                {/* Split Action Baseline Row */}
                {p.githubLink && (
                  <div className="mt-4 pt-3 border-t border-gray-700/40 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                      Repository Available
                    </span>
                    <a
                      href={p.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded bg-gray-900/60 border border-gray-700/50 text-gray-400 hover:text-gray-400 hover:border-gray-500/30 transition-all duration-200 group focus:outline-none cursor-pointer"
                      title="View Experimental Source Code"
                    >
                      <FiGithub
                        size={14}
                        className="transform group-hover:scale-105 transition-transform"
                      />
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Philosophy quote */}
          <blockquote className="mt-12 relative border-l-2 border-gray-500 pl-6">
            <div className="absolute -left-1 top-0 w-2 h-2 rounded-full bg-gray-500" />
            <p
              className="text-gray-300 text-base md:text-lg italic leading-relaxed"
              style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
            >
              &ldquo;I treat tutorials as optimization challenges — every
              boilerplate becomes a target for cleaner state engines, leaner
              layouts, and deliberate theming.&rdquo;
            </p>
            <footer className="mt-3">
              <cite className="text-gray-500 text-sm font-mono not-italic">
                — Eyob Desalegn
              </cite>
            </footer>
          </blockquote>
        </section>
      </div>
    </div>
  );
}
