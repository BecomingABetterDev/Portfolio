import React, { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { FiTrash2, FiMail, FiRefreshCw, FiInbox } from 'react-icons/fi'
import axiosInstance from '../../api/axiosInstance'
import { formatDate, truncate } from '../../utils/helpers'

export default function MessageList() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/messages')
      setMessages(res.data)
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load messages.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const handleMarkRead = async (id) => {
    try {
      await axiosInstance.patch(`/messages/${id}/read`)
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead: true } : m))
      )
    } catch {
      toast.error('Could not mark as read.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await axiosInstance.delete(`/messages/${id}`)
      setMessages((prev) => prev.filter((m) => m._id !== id))
      toast.success('Message deleted.')
    } catch {
      toast.error('Could not delete message.')
    }
  }

  const unreadCount = messages.filter((m) => !m.isRead).length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-400 text-sm">
            {messages.length} total
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs font-mono rounded">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-xs font-mono transition-colors focus:outline-none"
        >
          <FiRefreshCw size={13} />
          Refresh
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16">
          <FiMail className="mx-auto text-gray-700 mb-3" size={32} />
          <p className="text-gray-500 text-sm font-mono">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <article
              key={msg._id}
              className={`bg-gray-900 border rounded-lg p-5 transition-all duration-200 ${
                msg.isRead ? 'border-gray-800' : 'border-cyan-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Message preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="text-white text-sm font-semibold">{msg.name}</span>
                    <span className="text-gray-500 text-xs font-mono">{msg.email}</span>
                    {!msg.isRead && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    )}
                  </div>
                  {msg.subject && (
                    <p className="text-gray-400 text-xs font-mono mb-1.5">
                      Re: {msg.subject}
                    </p>
                  )}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {expanded === msg._id ? msg.message : truncate(msg.message, 100)}
                  </p>
                  {msg.message.length > 100 && (
                    <button
                      onClick={() =>
                        setExpanded((prev) => (prev === msg._id ? null : msg._id))
                      }
                      className="text-cyan-400 text-xs font-mono mt-1.5 hover:text-cyan-300 focus:outline-none"
                    >
                      {expanded === msg._id ? 'Show less' : 'Read more'}
                    </button>
                  )}
                  <p className="text-gray-600 text-xs font-mono mt-3">
                    {formatDate(msg.createdAt, 'MMM D, YYYY [at] h:mm A')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkRead(msg._id)}
                      title="Mark as read"
                      className="p-2 text-gray-500 hover:text-cyan-400 transition-colors focus:outline-none"
                    >
                      <FiInbox size={15} />
                    </button>
                  )}
                  {msg.isRead && (
                    <span title="Read" className="p-2 text-gray-700">
                      <FiMail size={15} />
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(msg._id)}
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
    </div>
  )
}
