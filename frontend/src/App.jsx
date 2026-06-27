import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomeView from "./views/HomeView";
import ProjectsView from "./views/ProjectsView";
import ContactView from "./views/ContactView";
import AdminView from "./views/AdminView";

// Secret admin trigger: press Alt + Shift + A to reveal admin view
const ADMIN_SECRET_KEY = "a";

export default function App() {
  const [currentView, setCurrentView] = useState("home");

  // Secret keyboard shortcut: Alt + Shift + A → admin view
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === ADMIN_SECRET_KEY) {
        setCurrentView((prev) => (prev === "admin" ? "home" : "admin"));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isAdmin = currentView === "admin";

  return (
    <AuthProvider onLogout={() => setCurrentView("home")}>
      {/* Premium background shell layer wrapping the entire viewport layout */}
      <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col overflow-x-hidden">
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1f2937",
              color: "#f9fafb",
              border: "1px solid #374151",
              fontFamily: "JetBrains Mono, Fira Code, monospace",
              fontSize: "13px",
            },
            success: {
              iconTheme: { primary: "#06b6d4", secondary: "#111827" },
            },
            error: {
              iconTheme: { primary: "#f87171", secondary: "#111827" },
            },
          }}
        />

        {/* Hide navbar on admin (admin has its own sidebar) */}
        {!isAdmin && (
          <Navbar
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        )}

        {/* 
          Main App View Engine Render Window.
          Appends a 'pt-16' padding offset only when the fixed navigation bar is visible, 
          preventing content clipping without breaking the layout of your native admin panel.
        */}
        <main className={`flex-grow ${!isAdmin ? "pt-16" : ""}`}>
          {currentView === "home" && (
            <HomeView setCurrentView={setCurrentView} />
          )}
          {currentView === "projects" && (
            <ProjectsView setCurrentView={setCurrentView} />
          )}
          {currentView === "contact" && (
            <ContactView setCurrentView={setCurrentView} />
          )}
          {currentView === "admin" && (
            <AdminView setCurrentView={setCurrentView} />
          )}
        </main>

        {/* Hide footer on admin */}
        {!isAdmin && <Footer setCurrentView={setCurrentView} />}
      </div>
    </AuthProvider>
  );
}
