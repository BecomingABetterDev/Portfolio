const Message = require("../models/Message");

// @desc    Submit contact form
// @route   POST /api/messages
const submitMessage = async(req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res
                .status(400)
                .json({ message: "Name, email, and message are required." });
        }

        const newMessage = await Message.create({ name, email, subject, message });
        res.status(201).json({ message: "Message received.", data: newMessage });
    } catch (error) {
        console.error("🔥 Submit Message Error:", error); // Added for easier debugging
        res.status(500).json({ message: "Failed to save message." });
    }
};

// @desc    Get all messages for admin dashboard
// @route   GET /api/messages
const getAllMessages = async(req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error("🔥 Fetch Messages Error:", error);
        res.status(500).json({ message: "Failed to fetch messages." });
    }
};

// @desc    Mark a message as read
// @route   PATCH /api/messages/:id/read
const markMessageRead = async(req, res) => {
    try {
        // Optimized to complete in a single atomic operation
        const msg = await Message.findByIdAndUpdate(
            req.params.id, { isRead: true }, { new: true }
        );

        if (!msg) {
            return res.status(404).json({ message: "Message not found." });
        }

        res.status(200).json(msg);
    } catch (error) {
        console.error("🔥 Update Message Error:", error);
        res.status(500).json({ message: "Failed to update message." });
    }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
const deleteMessage = async(req, res) => {
    try {
        // FIX: Swapped out the broken .remove() with an atomic findByIdAndDelete
        const msg = await Message.findByIdAndDelete(req.params.id);

        if (!msg) {
            return res.status(404).json({ message: "Message not found." });
        }

        res.status(200).json({ message: "Message deleted." });
    } catch (error) {
        console.error("🔥 Delete Message Error:", error);
        res.status(500).json({ message: "Failed to delete message." });
    }
};

module.exports = {
    submitMessage,
    getAllMessages,
    markMessageRead,
    deleteMessage,
};