import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  FiTrash2,
  FiMail,
  FiRefreshCw,
  FiInbox,
  FiAlertTriangle,
} from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import { formatDate, truncate } from "../../utils/helpers";

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  // Modal controller & async loading states retained locally
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    targetId: null,
    targetName: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/messages");
      setMessages(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load messages.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMarkRead = async (id) => {
    try {
      await axiosInstance.patch(`/messages/${id}/read`);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead: true } : m))
      );
    } catch {
      toast.error("Could not mark as read.");
    }
  };

  const triggerDeletePrompt = (msg) => {
    setDeleteModal({
      isOpen: true,
      targetId: msg._id,
      targetName: `Inbound item from ${msg.name}`,
    });
  };

  const executeDeleteRoutine = async () => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/messages/${deleteModal.targetId}`);
      setMessages((prev) => prev.filter((m) => m._id !== deleteModal.targetId));
      toast.success("Message deleted.");
      setDeleteModal({ isOpen: false, targetId: null, targetName: "" });
    } catch {
      toast.error("Could not delete message.");
    } finally {
      setIsDeleting(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Original Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-400 text-sm">
            {messages.length} total
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs font-mono rounded">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-400 text-xs font-mono transition-colors focus:outline-none"
        >
          <FiRefreshCw size={13} />
          Refresh
        </button>
      </div>

      {/* Original Empty State vs List Switcher */}
      {messages.length === 0 ? (
        <div className="text-center py-16">
          <FiMail
            className="mx-auto text-gray-700 mb-3"
            size={32}
          />
          <p className="text-gray-500 text-sm font-mono">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <article
              key={msg._id}
              className={`bg-gray-900 border rounded-lg p-5 transition-all duration-200 ${
                msg.isRead ? "border-gray-800" : "border-gray-500/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Original Message Preview Layout Structure */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="text-white text-sm font-semibold">
                      {msg.name}
                    </span>
                    <span className="text-gray-500 text-xs font-mono">
                      {msg.email}
                    </span>
                    {!msg.isRead && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    )}
                  </div>
                  {msg.subject && (
                    <p className="text-gray-400 text-xs font-mono mb-1.5">
                      Re: {msg.subject}
                    </p>
                  )}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {expanded === msg._id
                      ? msg.message
                      : truncate(msg.message, 100)}
                  </p>
                  {msg.message.length > 100 && (
                    <button
                      onClick={() =>
                        setExpanded((prev) =>
                          prev === msg._id ? null : msg._id
                        )
                      }
                      className="text-gray-400 text-xs font-mono mt-1.5 hover:text-gray-300 focus:outline-none"
                    >
                      {expanded === msg._id ? "Show less" : "Read more"}
                    </button>
                  )}
                  <p className="text-gray-600 text-xs font-mono mt-3">
                    {formatDate(msg.createdAt, "MMM D, YYYY [at] h:mm A")}
                  </p>
                </div>

                {/* Original Action Bar Structure */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkRead(msg._id)}
                      title="Mark as read"
                      className="p-2 text-gray-500 hover:text-gray-400 transition-colors focus:outline-none"
                    >
                      <FiInbox size={15} />
                    </button>
                  )}
                  {msg.isRead && (
                    <span
                      title="Read"
                      className="p-2 text-gray-700"
                    >
                      <FiMail size={15} />
                    </span>
                  )}
                  <button
                    onClick={() => triggerDeletePrompt(msg)}
                    title="Delete message"
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors focus:outline-none"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Embedded Deleting Modal Interface */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
            onClick={() =>
              !isDeleting &&
              setDeleteModal({ isOpen: false, targetId: null, targetName: "" })
            }
          />

          <div className="mt-24 relative bg-gray-900 border border-gray-900 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-8 z-10 animate-view-enter">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-900/30 border border-red-500/20 text-red-400 rounded-lg flex-shrink-0">
                <FiAlertTriangle size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-base font-bold text-white tracking-tight uppercase"
                  style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
                >
                  Inbound Telemetry Data
                </h3>
                <p className="text-gray-400 text-xs font-mono mt-1 leading-relaxed">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
                <div className="mt-2.5 px-3 py-2 bg-gray-900/60 border border-gray-900 rounded font-mono text-[12px] text-cyan-400 truncate">
                  {deleteModal.targetName}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-900 font-mono text-xs">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() =>
                  setDeleteModal({
                    isOpen: false,
                    targetId: null,
                    targetName: "",
                  })
                }
                className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 transition-all disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={executeDeleteRoutine}
                className="px-4 py-2 rounded-lg bg-red-900/30 hover:bg-red-900/40 border border-red-500/30 text-red-400 font-bold transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 focus:outline-none"
              >
                {isDeleting ? (
                  <>
                    <div className=" w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
