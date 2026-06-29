import React from "react";
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Resource Matrix",
  itemName = "this item",
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    // CRITICAL FIX: fixed inset-0 z-[9999] completely pulls this card out of normal document flow
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-900/80 backdrop-blur-sm animate-fade-in">
      {/* Background overlay click-away interceptor */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal Core Container Card Box */}
      <div
        className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-6 text-left transform scale-in transition-all overflow-hidden z-10"
        role="dialog"
        aria-modal="true"
      >
        {/* Decorative Top Accent Warning Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500 shadow-[0_1px_10px_rgba(239,68,68,0.5)]" />

        {/* Close Button Trigger */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-1.5 rounded bg-gray-900/40 border border-gray-800 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <FiX size={14} />
        </button>

        {/* Header Alert Flag Area */}
        <div className="flex items-start gap-4 mt-2">
          <div className="p-2.5 bg-red-900/30 text-red-400 rounded-lg border border-red-900/40 flex-shrink-0">
            <FiAlertTriangle
              size={18}
              className="animate-pulse"
            />
          </div>
          <div className="space-y-1 pr-6">
            <h3 className="text-red-400 text-xs font-bold tracking-tight uppercase font-mono">
              Destructive Routine Triggered
            </h3>
            <p className="text-gray-400 font-mono text-[11px] uppercase tracking-wide">
              Target Scope: {title}
            </p>
          </div>
        </div>

        {/* Content Body Descriptor */}
        <div className="mt-4 space-y-3 font-sans text-xs leading-relaxed text-gray-400">
          <p>
            You are initiating a structural drop request for:{" "}
            <span className="font-mono text-white bg-gray-900 px-1.5 py-0.5 rounded border border-gray-800 inline-block max-w-full truncate align-middle">
              {itemName}
            </span>
          </p>

          <div className="p-3 bg-gray-900/50 border border-gray-800/80 rounded-lg text-[11px] font-mono text-gray-500 space-y-1">
            <p className="text-gray-400">// WARNING:</p>
            <p>
              This mutation completely wipes the document database state. Static
              local caching engines will instantly lose linkage synchronization.
            </p>
          </div>
        </div>

        {/* Action Controls Matrix */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 border border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white rounded transition-colors focus:outline-none cursor-pointer disabled:opacity-40"
          >
            sys.abort()
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-red-900/40 text-white rounded font-semibold tracking-wide transition-all focus:outline-none cursor-pointer"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-3.5 w-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>processing...</span>
              </>
            ) : (
              <>
                <FiTrash2 size={12} />
                <span>sys.purge()</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
