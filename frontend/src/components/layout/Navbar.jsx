import React, { useState } from "react";
import { FiMenu, FiX, FiTerminal, FiLayers } from "react-icons/fi";

export default function Navbar({ currentView, setCurrentView }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", shortcut: "01" },
    { id: "projects", label: "Projects", shortcut: "02" },
    { id: "contact", label: "Contact", shortcut: "03" },
  ];

  const handleNavigate = (viewId) => {
    setCurrentView(viewId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/50 backdrop-blur-md border-b border-gray-900/80 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Architecture Monogram */}
        <button
          onClick={() => handleNavigate("home")}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white group cursor-pointer focus:outline-none"
        >
          <div className="p-1.5 bg-gray-900 border border-gray-800 rounded group-hover:border-gray-500/50 transition-colors">
            <FiTerminal
              className="text-gray-400 group-hover:animate-pulse"
              size={12}
            />
          </div>
          <span className="font-bold tracking-tight text-sm">
            EYOB
            <span className="text-gray-400 font-mono font-normal">.SYS</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="relative py-2 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer focus:outline-none flex items-baseline gap-1"
              >
                <span className="text-[9px] text-gray-600 font-normal">
                  {item.shortcut}
                </span>
                <span
                  className={
                    isActive
                      ? "text-gray-400 font-medium"
                      : "text-gray-400 hover:text-white"
                  }
                >
                  {item.label}
                </span>

                {/* Active Underline Highlight */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-500 shadow-[0_1px_6px_rgba(34,211,238,0.4)] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Action Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none cursor-pointer rounded bg-gray-900/40 border border-gray-800"
          aria-label="Toggle Navigation Control"
        >
          {isOpen ? <FiX size={16} /> : <FiMenu size={16} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay Layer */}
      <div
        className={`fixed top-16 left-0 right-0 bg-gray-900/95 border-b border-gray-900 backdrop-blur-lg md:hidden transition-all duration-300 transform origin-top ${
          isOpen
            ? "scale-y-100 opacity-100 pointer-events-auto"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-4 flex flex-col text-left">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full py-3 px-4 rounded-lg font-mono text-xs uppercase tracking-widest text-left flex items-center justify-between transition-all ${
                  isActive
                    ? "bg-gray-950/20 border border-gray-900/50 text-cyan-400"
                    : "bg-gray-900/20 border border-gray-900 text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-600">
                    {item.shortcut}
                  </span>
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <FiLayers
                    size={12}
                    className="text-gray-400 transition-transform"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
