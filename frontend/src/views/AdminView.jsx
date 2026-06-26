import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  FiLogOut,
  FiFolder,
  FiInbox,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiTerminal,
  FiGrid,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import ProjectForm from "../components/admin/ProjectForm";
import MessageList from "../components/admin/MessageList";

// ─── LOGIN SCREEN (MODERNIZED HARDENED CONTROL BLOCK) ────────────────────────
function LoginScreen({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Email and password required.");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", form);
      onLogin(res.data.token, res.data.admin.email);
      toast.success(`Welcome back, ${res.data.admin.email}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 relative overflow-hidden">
      {/* Background Micro Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm bg-gray-900/40 border border-gray-800/80 p-8 rounded-xl backdrop-blur-md shadow-2xl relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

        {/* Gateway Header */}
        <div className="mb-8">
          <div className="w-10 h-10 rounded border border-gray-800 bg-gray-900/60 flex items-center justify-center mb-4 group hover:border-cyan-500/50 transition-colors duration-300">
            <span className="text-cyan-400 font-mono font-bold tracking-tight text-sm">
              SYS
            </span>
          </div>
          <h1
            className="text-xl font-bold text-white tracking-tight"
            style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
          >
            Admin Gateway
          </h1>
          <p className="text-gray-500 text-xs font-mono mt-1 tracking-wide">
            eyob-portfolio // security_layer
          </p>
        </div>

        {/* Input Controls Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-1.5">
              Ident_String (Email)
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded text-white text-sm placeholder-gray-700 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 font-mono"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-1.5">
              Pass_Hash (Password)
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded text-white text-sm placeholder-gray-700 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-950 disabled:text-gray-600 font-semibold text-xs font-mono uppercase tracking-wider rounded transition-all duration-200 focus:outline-none"
          >
            {loading ? "Authenticating..." : "Establish Session"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-[10px] font-mono mt-8 tracking-wide">
          Protected Environment · Root Access Only
        </p>
      </div>
    </div>
  );
}

// ─── PROJECTS PANEL (CLEAN CONTROL SUITE) ────────────────────────────────────
function ProjectsPanel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/projects");
      setProjects(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load projects.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    try {
      await axiosInstance.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted.");
    } catch {
      toast.error("Could not delete project.");
    }
  };

  const openCreate = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEdit = (project) => {
    setEditTarget(project);
    setFormOpen(true);
  };

  const onSaved = () => {
    setFormOpen(false);
    setEditTarget(null);
    fetchProjects();
  };

  const STATUS_CONFIG = {
    Active: {
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      dot: "bg-cyan-400",
    },
    Completed: {
      color: "text-green-400 bg-green-500/10 border-green-500/20",
      dot: "bg-green-400",
    },
    "In Progress": {
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      dot: "bg-yellow-400",
    },
  };

  return (
    <div className="space-y-6">
      {/* Panel Toolbar Header */}
      <div className="flex items-center justify-between border-b border-gray-800/60 pb-4">
        <div className="flex items-center gap-2">
          <FiGrid
            className="text-cyan-500/80"
            size={16}
          />
          <h2
            className="text-white font-medium text-base tracking-tight"
            style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
          >
            Index Arrays
          </h2>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-mono font-semibold text-xs uppercase tracking-wider rounded transition-all duration-200 focus:outline-none transform hover:-translate-y-0.5"
        >
          <FiPlus size={14} />
          Append Record
        </button>
      </div>

      {/* Embedded Form Module */}
      {formOpen && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-xl backdrop-blur-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
          <ProjectForm
            project={editTarget}
            onSaved={onSaved}
            onCancel={() => setFormOpen(false)}
          />
        </div>
      )}

      {/* Dynamic Render Tree */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/20 border border-dashed border-gray-800 rounded-xl">
          <FiFolder
            className="mx-auto text-gray-700 mb-3"
            size={28}
          />
          <p className="text-gray-400 text-sm font-mono tracking-wide">
            No projects committed to cluster.
          </p>
          <p className="text-gray-600 text-xs font-mono mt-1">
            System configuration currently serves local static matrix elements.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-800/80 rounded-xl bg-gray-900/10 backdrop-blur-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900/40 border-b border-gray-800/80">
                  <th className="px-5 py-3 text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                    Project Identifier
                  </th>
                  <th className="px-5 py-3 text-gray-500 font-mono text-[10px] uppercase tracking-widest hidden md:table-cell">
                    Architectural Layer
                  </th>
                  <th className="px-5 py-3 text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                    Execution State
                  </th>
                  <th className="px-5 py-3 text-gray-500 font-mono text-[10px] uppercase tracking-widest text-right">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40 font-mono text-xs">
                {projects.map((p) => {
                  const stateConfig = STATUS_CONFIG[p.status] || {
                    color: "text-gray-400 bg-gray-800/40 border-gray-700/30",
                    dot: "bg-gray-500",
                  };
                  return (
                    <tr
                      key={p._id}
                      className="hover:bg-gray-800/20 transition-colors duration-150"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-gray-100 font-medium tracking-tight font-sans text-sm">
                            {p.name}
                          </span>
                          {p.isFeatured && (
                            <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 tracking-wider uppercase scale-95">
                              featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell text-gray-400 text-xs">
                        {p.systemTag || "Unspecified Build"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] tracking-wide ${stateConfig.color}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${stateConfig.dot} animate-pulse`}
                          />
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEdit(p)}
                            title="Modify Record"
                            className="p-1.5 text-gray-500 hover:text-cyan-400 hover:bg-gray-800/40 rounded transition-all duration-150 focus:outline-none"
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            title="Wipe Record"
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800/40 rounded transition-all duration-150 focus:outline-none"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD SHELL (LAYOUT-COMPATIBLE WORKSPACE) ───────────────────────────
function Dashboard({ setCurrentView }) {
  const { logout, adminEmail } = useAuth();
  const [panel, setPanel] = useState("projects");

  const handleLogout = () => {
    logout();
    setCurrentView("home");
    toast.success("Logged out.");
  };

  const SIDEBAR_ITEMS = [
    { id: "projects", icon: FiFolder, label: "Projects Registry" },
    { id: "messages", icon: FiInbox, label: "Telemetry Inbound" },
  ];

  return (
    /* FIXED NAVIDENT PATTERN COMPATIBILITY WORKAROUND:
      We explicitly map the top margin to match the 80px global layout constraints, 
      preventing fixed navbar containers from sliding directly over title modules.
    */
    <div className="h-screen overflow-hidden bg-gray-950 flex">
      {/* Control Workspace Left Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-gray-950 border-r border-gray-900 flex flex-col relative z-20">
        {/* Account Profiler Node */}
        <div className="px-5 py-5 border-b border-gray-900 bg-gray-900/[0.15]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded border border-gray-800 bg-gray-900/60 flex items-center justify-center">
              <FiUser
                size={13}
                className="text-cyan-400"
              />
            </div>
            <div>
              <span
                className="text-white text-xs font-semibold tracking-tight block"
                style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
              >
                Control Console
              </span>
              <span className="text-[10px] font-mono text-gray-500 block max-w-[140px] truncate mt-0.5">
                {adminEmail}
              </span>
            </div>
          </div>
        </div>

        {/* Console Panel Traversal Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {SIDEBAR_ITEMS.map(({ id, icon: Icon, label }) => {
            const isSelected = panel === id;
            return (
              <button
                key={id}
                onClick={() => setPanel(id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-mono tracking-wide transition-all duration-200 focus:outline-none relative group ${
                  isSelected
                    ? "text-cyan-400 bg-cyan-500/[0.04] border border-cyan-500/20 font-medium"
                    : "text-gray-500 hover:text-gray-200 hover:bg-gray-900/40 border border-transparent"
                }`}
              >
                {isSelected && (
                  <span className="absolute left-0 top-2 bottom-2 w-[2px] bg-cyan-400 rounded-r" />
                )}
                <Icon
                  size={14}
                  className={
                    isSelected
                      ? "text-cyan-400"
                      : "text-gray-500 group-hover:text-gray-400"
                  }
                />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Global Traversal and Session Exit Anchors */}
        <div className="px-3 pb-6 space-y-1 border-t border-gray-900/60 pt-4">
          <button
            onClick={() => {
              setCurrentView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-mono text-gray-500 hover:text-gray-200 hover:bg-gray-900/40 border border-transparent transition-all duration-150 focus:outline-none"
          >
            <FiEye size={14} />
            Exit Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-mono text-gray-500 hover:text-red-400 hover:bg-red-500/[0.04] border border-transparent transition-all duration-150 focus:outline-none"
          >
            <FiLogOut size={14} />
            Purge Session (Logout)
          </button>
        </div>
      </aside>

      {/* Primary Display Viewport */}
      <main className="flex-1 overflow-y-auto bg-gray-950/40 relative z-10">
        <div className="p-8 max-w-5xl mx-auto w-full">
          {/* View Metadata Jumbotron Header */}
          <div className="mb-8 pb-5 border-b border-gray-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1
                className="text-xl font-bold text-white tracking-tight flex items-center gap-2"
                style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
              >
                <FiTerminal className="text-cyan-500 text-base" />
                {panel === "projects"
                  ? "PROJECT_REGISTRY_MATRIX"
                  : "INBOUND_TELEMETRY_LOGS"}
              </h1>
              <p className="text-gray-500 text-xs font-mono mt-1 tracking-wide">
                {panel === "projects"
                  ? "Active cloud system deployment configurations overrides fallback static structures."
                  : "Asynchronous platform communication channels transmitted by client entry forms."}
              </p>
            </div>
          </div>

          {/* Router Content Injections */}
          <div className="view-enter">
            {panel === "projects" && <ProjectsPanel />}
            {panel === "messages" && <MessageList />}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── ADMINVIEW ROUTER ROOT LAYER ──────────────────────────────────────────────
export default function AdminView({ setCurrentView }) {
  const { isLoggedIn, login } = useAuth();

  if (!isLoggedIn) {
    return <LoginScreen onLogin={login} />;
  }

  return <Dashboard setCurrentView={setCurrentView} />;
}
