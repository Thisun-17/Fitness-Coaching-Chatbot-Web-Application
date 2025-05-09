const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

/**
 * @route   POST /api/chat
 * @desc    Process user chat message and return response
 * @access  Public
 */
router.post('/', chatController.processMessage);

/**
 * @route   GET /api/chat/history
 * @desc    Get chat history for a user (if implemented)
 * @access  Private
 */
router.get('/history', chatController.getChatHistory);

module.exports = router;