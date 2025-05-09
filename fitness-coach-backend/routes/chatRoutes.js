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

/**
 * @route   GET /api/chat/verify-php
 * @desc    Verify connection to the PHP backend
 * @access  Public
 */
router.get('/verify-php', chatController.verifyPhpConnection);

/**
 * @route   GET /api/chat/test-php
 * @desc    Test the PHP API connectivity with the test endpoint
 * @access  Public
 */
router.get('/test-php', chatController.testPhpConnection);

module.exports = router;