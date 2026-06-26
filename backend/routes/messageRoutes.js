const express = require('express')
const router = express.Router()
const {
  submitMessage,
  getAllMessages,
  markMessageRead,
  deleteMessage,
} = require('../controllers/messageController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', submitMessage)
router.get('/', protect, getAllMessages)
router.patch('/:id/read', protect, markMessageRead)
router.delete('/:id', protect, deleteMessage)

module.exports = router
