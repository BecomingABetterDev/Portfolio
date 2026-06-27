import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiX, FiSave } from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import {
  commaToArray,
  arrayToComma,
  newlineToArray,
  arrayToNewline,
} from "../../utils/helpers";

// Expanded initialization layout containing image and source code keys
const EMPTY = {
  name: "",
  systemTag: "",
  status: "In Progress",
  shortDescription: "",
  fullDescription: "",
  techStackTags: "",
  architectureHighlights: "",
  isFeatured: false,
  order: 0,
  imageUrl: "", // ── NEW STATE PROPERTY FOR IMAGERY LINKING ──
  githubLink: "", // ── NEW STATE PROPERTY FOR SOURCE CODE REPOSITORIES ──
};

export default function ProjectForm({ project, onSaved, onCancel }) {
  const isEdit = Boolean(
    project && project._id && !project._id.startsWith("static")
  );

  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  // Sync component state when editing an existing project instance
  useEffect(() => {
    if (project) {
      setForm({
        name: project.name || "",
        systemTag: project.systemTag || "",
        status: project.status || "In Progress",
        shortDescription: project.shortDescription || "",
        fullDescription: project.fullDescription || "",
        techStackTags: arrayToComma(project.techStackTags),
        architectureHighlights: arrayToNewline(project.architectureHighlights),
        isFeatured: project.isFeatured || false,
        order: project.order || 0,
        imageUrl: project.imageUrl || "", // ── INJECT LIVE CLOUD PROPERTY VALUE ──
        githubLink: project.githubLink || "", // ── INJECT LIVE CLOUD PROPERTY VALUE ──
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Project name is required.");
      return;
    }
    setSaving(true);

    // Assembles outgoing JSON transmission schema
    const payload = {
      ...form, // Natively passes along updated imageUrl and githubLink state modifications
      techStackTags: commaToArray(form.techStackTags),
      architectureHighlights: newlineToArray(form.architectureHighlights),
      order: Number(form.order) || 0,
    };

    try {
      if (isEdit) {
        await axiosInstance.put(`/projects/${project._id}`, payload);
        toast.success("Project updated successfully.");
      } else {
        await axiosInstance.post("/projects", payload);
        toast.success("Project created successfully.");
      }
      onSaved();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Failed to save project config parameters.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded text-white text-sm placeholder-gray-600 focus:outline-none";
  const inputStyle = { background: "#111827", border: "1px solid #374151" };
  const labelClass =
    "block text-gray-400 text-xs font-mono uppercase tracking-wider mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-white font-semibold text-lg"
          style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
        >
          {isEdit
            ? "Edit Project Config Matrix"
            : "Provision New Project Record"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-white transition-colors focus:outline-none"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Name */}
      <div>
        <label className={labelClass}>Project Name *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="EthioStudy"
          className={inputClass}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
          onBlur={(e) => (e.target.style.borderColor = "#374151")}
          required
        />
      </div>

      {/* System Tag */}
      <div>
        <label className={labelClass}>System Tag</label>
        <input
          type="text"
          name="systemTag"
          value={form.systemTag}
          onChange={handleChange}
          placeholder="Offline-First Educational Web Application"
          className={inputClass}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
          onBlur={(e) => (e.target.style.borderColor = "#374151")}
        />
      </div>

      {/* Status + Order row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
            onBlur={(e) => (e.target.style.borderColor = "#374151")}
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Display Order</label>
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            min={0}
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
            onBlur={(e) => (e.target.style.borderColor = "#374151")}
          />
        </div>
      </div>

      {/* ─── NEW MEDIA LINKING SUB-GRID ROW ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Project Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="e.g., /images/ethiostudy.png or absolute URL"
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
            onBlur={(e) => (e.target.style.borderColor = "#374151")}
          />
        </div>
        <div>
          <label className={labelClass}>GitHub Repository Link</label>
          <input
            type="url"
            name="githubLink"
            value={form.githubLink}
            onChange={handleChange}
            placeholder="https://github.com/username/repository"
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
            onBlur={(e) => (e.target.style.borderColor = "#374151")}
          />
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className={labelClass}>Short Description</label>
        <textarea
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          rows={2}
          placeholder="One or two sentence summary shown on cards"
          className={`${inputClass} resize-y`}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
          onBlur={(e) => (e.target.style.borderColor = "#374151")}
        />
      </div>

      {/* Full Description */}
      <div>
        <label className={labelClass}>Full Description</label>
        <textarea
          name="fullDescription"
          value={form.fullDescription}
          onChange={handleChange}
          rows={4}
          placeholder="Detailed description shown in expanded project view"
          className={`${inputClass} resize-y`}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
          onBlur={(e) => (e.target.style.borderColor = "#374151")}
        />
      </div>

      {/* Tech Stack Tags */}
      <div>
        <label className={labelClass}>Tech Stack Tags (comma-separated)</label>
        <input
          type="text"
          name="techStackTags"
          value={form.techStackTags}
          onChange={handleChange}
          placeholder="Node.js, Express.js, MongoDB, JWT"
          className={inputClass}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
          onBlur={(e) => (e.target.style.borderColor = "#374151")}
        />
      </div>

      {/* Architecture Highlights */}
      <div>
        <label className={labelClass}>
          Architecture Highlights (one per line)
        </label>
        <textarea
          name="architectureHighlights"
          value={form.architectureHighlights}
          onChange={handleChange}
          rows={4}
          placeholder="Service Worker for asset caching and offline serving&#10;IndexedDB as a local mutation buffer"
          className={`${inputClass} resize-y`}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
          onBlur={(e) => (e.target.style.borderColor = "#374151")}
        />
      </div>

      {/* Featured checkbox */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          checked={form.isFeatured}
          onChange={handleChange}
          className="w-4 h-4 accent-cyan-500"
        />
        <label
          htmlFor="isFeatured"
          className="text-gray-300 text-sm cursor-pointer"
        >
          Feature on homepage
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-900 disabled:text-gray-500 font-semibold text-sm rounded transition-all duration-200 focus:outline-none"
        >
          <FiSave size={14} />
          {saving ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white text-sm rounded transition-all duration-200 focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
