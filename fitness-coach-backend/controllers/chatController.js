const axios = require('axios');

// URL for the PHP backend
const PHP_API_URL = process.env.PHP_API_URL || 'http://localhost:80/fitness-coach-php/api';

// Log the PHP API URL for debugging
console.log(`[ChatController] Using PHP API URL: ${PHP_API_URL}`);

/**
 * Process a user message and return a response
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.processMessage = async (req, res) => {
  try {
    console.log(`[ChatController] Processing message request at ${new Date().toISOString()}`);
    const { message } = req.body;
    
    if (!message) {
      console.log('[ChatController] Error: No message provided in request');
      return res.status(400).json({
        status: 'error',
        message: 'No message provided'
      });
    }
    
    console.log(`[ChatController] Forwarding message to PHP API: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`);
    
    // Forward the message to the PHP API
    console.log(`[ChatController] Calling PHP endpoint: ${PHP_API_URL}/chat.php`);
    const response = await axios.post(`${PHP_API_URL}/chat.php`, {
      message,
      timestamp: new Date().toISOString()
    });
    
    console.log(`[ChatController] Received response from PHP API with status: ${response.status}`);
    console.log(`[ChatController] PHP API response data:`, response.data);
    
    // Return the response to the client
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('[ChatController] Error processing message:');
    
    // Detailed error logging
    if (error.response) {
      // The request was made and the server responded with a non-2xx status
      console.error(`[ChatController] PHP API responded with status: ${error.response.status}`);
      console.error('[ChatController] PHP API error response:', error.response.data);
      return res.status(error.response.status).json({
        status: 'error',
        message: `PHP API error: ${error.response.status}`,
        details: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('[ChatController] No response received from PHP API');
      console.error('[ChatController] Request details:', error.request);
      return res.status(503).json({
        status: 'error',
        message: 'PHP API not responding',
        details: 'No response received from the PHP backend'
      });
    } else {
      // Something happened in setting up the request
      console.error('[ChatController] Error setting up request:', error.message);
      return res.status(500).json({
        status: 'error',
        message: 'Request setup error',
        details: error.message
      });
    }
  }
};

/**
 * Get chat history for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getChatHistory = async (req, res) => {
  try {
    console.log(`[ChatController] Request for chat history received at ${new Date().toISOString()}`);
    // This would typically require user authentication
    // For now, we'll just return a placeholder response
    return res.status(200).json({
      status: 'success',
      message: 'Chat history feature not implemented yet'
    });
  } catch (error) {
    console.error('[ChatController] Error getting chat history:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to get chat history'
    });
  }
};

/**
 * Verify connection to PHP backend
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.verifyPhpConnection = async (req, res) => {
  try {
    console.log(`[ChatController] Verifying PHP connection at ${new Date().toISOString()}`);
    
    // Try to connect to the PHP backend
    const response = await axios.get(`${PHP_API_URL}/chat.php?check=connection`);
    
    console.log(`[ChatController] PHP connection verified with status: ${response.status}`);
    return res.status(200).json({
      status: 'success',
      message: 'PHP backend connection successful',
      phpStatus: response.data
    });
  } catch (error) {
    console.error('[ChatController] PHP connection verification failed:');
    
    if (error.response) {
      console.error(`[ChatController] PHP API responded with status: ${error.response.status}`);
      return res.status(200).json({
        status: 'warning',
        message: 'PHP backend responded with an error',
        phpStatus: error.response.data
      });
    } else {
      console.error('[ChatController] No response from PHP API:', error.message);
      return res.status(503).json({
        status: 'error',
        message: 'PHP backend connection failed',
        error: error.message
      });
    }
  }
};