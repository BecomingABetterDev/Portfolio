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
  imageUrl: "",
  githubLink: "",
};

export default function ProjectForm({ project, onSaved, onCancel }) {
  const isEdit = Boolean(
    project && project._id && !project._id.startsWith("static")
  );

  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

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
        imageUrl: project.imageUrl || "",
        githubLink: project.githubLink || "",
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
    const payload = {
      ...form,
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
        err.response?.data?.message || "Failed to save project parameters.";
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
      className="flex flex-col max-h-[75vh] text-left overflow-hidden pb-1"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-4 flex-shrink-0">
        <h3
          className="text-white font-semibold text-sm font-mono uppercase tracking-wider"
          style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
        >
          {isEdit ? "// EDIT_PROJECT_RECORD" : "// PROVISION_NEW_RECORD"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-white transition-colors focus:outline-none cursor-pointer"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* Fields Body */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-2 pb-6 scrollbar-thin scrollbar-thumb-gray-700">
        <div>
          <label className={labelClass}>Project Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., EthioStudy"
            className={inputClass}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label className={labelClass}>System Tag</label>
          <input
            type="text"
            name="systemTag"
            value={form.systemTag}
            onChange={handleChange}
            placeholder="e.g., Full-Stack System Architecture"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
              style={inputStyle}
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Display Order Position</label>
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              min={0}
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Project Image Path / URL</label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="/images/project.png"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass}>GitHub Repository Target Link</label>
            <input
              type="url"
              name="githubLink"
              value={form.githubLink}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Short Summary Card Text</label>
          <textarea
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            rows={2}
            className={`${inputClass} resize-y`}
            style={inputStyle}
          />
        </div>

        <div>
          <label className={labelClass}>Full Operational Description</label>
          <textarea
            name="fullDescription"
            value={form.fullDescription}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} resize-y`}
            style={inputStyle}
          />
        </div>

        <div>
          <label className={labelClass}>
            Tech Stack Tags (comma-separated)
          </label>
          <input
            type="text"
            name="techStackTags"
            value={form.techStackTags}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div>
          <label className={labelClass}>
            Architecture Highlights (one per line)
          </label>
          <textarea
            name="architectureHighlights"
            value={form.architectureHighlights}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} resize-y`}
            style={inputStyle}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
            className="w-4 h-4 accent-gray-500 cursor-pointer"
          />
          <label
            htmlFor="isFeatured"
            className="text-gray-300 text-xs font-mono uppercase tracking-wide cursor-pointer select-none"
          >
            Feature on homepage matrix
          </label>
        </div>
      </div>

      {/* ─── HARDENED HIGH-CONTRAST INTERACTIVE ACTION FOOTER ─── */}
      <div className="flex gap-3 pt-4 border-t border-gray-800 mt-auto flex-shrink-0 bg-gray-900 z-20 relative">
        <button
          type="submit"
          disabled={saving}
          style={{ backgroundColor: "#06b6d4", color: "#030712" }}
          className="flex items-center gap-2 px-5 py-2 bg-gray-500 hover:bg-gray-400 text-gray-900 font-mono font-semibold text-xs uppercase tracking-wider rounded transition-all duration-200 focus:outline-none transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-gray-500/10"
        >
          <FiSave size={14} />
          {saving
            ? "Saving Changes..."
            : isEdit
            ? "Commit Changes"
            : "Append Record"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white font-mono text-xs uppercase tracking-wider rounded transition-all duration-200 focus:outline-none cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
