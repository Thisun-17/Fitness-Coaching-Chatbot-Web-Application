const axios = require('axios');

// URL for the PHP backend
const PHP_API_URL = process.env.PHP_API_URL || 'http://localhost:80/fitness-coach-php/api';

/**
 * Process a user message and return a response
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.processMessage = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        status: 'error',
        message: 'No message provided'
      });
    }
    
    // Forward the message to the PHP API
    const response = await axios.post(`${PHP_API_URL}/chat.php`, {
      message,
      timestamp: new Date().toISOString()
    });
    
    // Return the response to the client
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error processing message:', error);
    
    // Handle errors from the PHP API
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    
    // Handle network errors
    return res.status(500).json({
      status: 'error',
      message: 'Failed to process message'
    });
  }
};

/**
 * Get chat history for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getChatHistory = async (req, res) => {
  try {
    // This would typically require user authentication
    // For now, we'll just return a placeholder response
    return res.status(200).json({
      status: 'success',
      message: 'Chat history feature not implemented yet'
    });
  } catch (error) {
    console.error('Error getting chat history:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to get chat history'
    });
  }
};