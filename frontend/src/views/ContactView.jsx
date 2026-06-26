import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiSend, FiLoader } from "react-icons/fi";
import SectionHeading from "../components/ui/SectionHeading";
import axiosInstance from "../api/axiosInstance";
import { OWNER } from "../data/staticData";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

export default function ContactView() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [apiDown, setApiDown] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = form;

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Name, email, and message are required.");
      return;
    }

    setSending(true);
    try {
      await axiosInstance.post("/messages", form);
      toast.success("Message sent — I will get back to you shortly.");
      setForm(EMPTY_FORM);
      setApiDown(false);
    } catch {
      setApiDown(true);
      toast.error("Could not send message. See the fallback below.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="view-enter"
      style={{ paddingTop: "80px" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading
          label="03 / Contact"
          title="Get in Touch"
          subtitle="Open to project inquiries, collaboration discussions, and technical feedback."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* ─── LEFT COLUMN: CONTACT INFORMATION & METADATA ─── */}
          <div className="space-y-6">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <FiMail
                    className="text-cyan-400"
                    size={16}
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${OWNER.email}`}
                    className="text-white text-sm hover:text-cyan-400 transition-colors duration-200 font-mono"
                  >
                    {OWNER.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <FiMapPin
                    className="text-cyan-400"
                    size={16}
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-1">
                    Location
                  </p>
                  <p className="text-white text-sm font-mono">
                    {OWNER.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Badge Card */}
            <div className="bg-gray-900/30 border border-gray-800/80 rounded-xl p-6 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
              <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-3">
                Availability
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Currently focused on completing Grade 11 and shipping active
                projects. Available for async collaboration, code reviews, and
                project consulting.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 text-xs font-mono tracking-wide">
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: COMPACT COMMUNICATIONS FORM ─── */}
          <div className="bg-gray-900/10 border border-gray-900/60 p-6 md:p-8 rounded-xl backdrop-blur-xs">
            <form
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="space-y-4">
                {/* Responsive Side-by-Side Horizontal Grid Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-1.5"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded text-white text-sm placeholder-gray-700 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 font-mono"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-1.5"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded text-white text-sm placeholder-gray-700 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 font-mono"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded text-white text-sm placeholder-gray-700 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 font-mono"
                  />
                </div>

                {/* Message Body Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your project, question, or idea..."
                    rows={4}
                    required
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded text-white text-sm placeholder-gray-700 resize-y focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 font-mono"
                  />
                </div>

                {/* Micro-Interaction Submission Trigger */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-2.5 mt-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-950 disabled:text-gray-600 font-mono font-semibold text-xs uppercase tracking-wider rounded transition-all duration-200 focus:outline-none transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <FiLoader
                        size={14}
                        className="animate-spin"
                      />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <FiSend size={14} />
                      Dispatch Message
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Asynchronous Link Outage Fallback */}
            {apiDown && (
              <div className="mt-4 p-4 bg-yellow-900/10 border border-yellow-700/20 rounded-lg view-enter">
                <p className="text-yellow-400 text-xs font-mono leading-relaxed">
                  [NETWORK_ERROR]: The contact gateway API cluster is currently
                  unreachable. Please route your transmission directly to:{" "}
                  <a
                    href={`mailto:${OWNER.email}`}
                    className="text-cyan-400 underline hover:text-cyan-300 transition-colors duration-150"
                  >
                    {OWNER.email}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
