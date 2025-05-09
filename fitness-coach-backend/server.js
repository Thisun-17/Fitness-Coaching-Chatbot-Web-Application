const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const chatRoutes = require('./routes/chatRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enhanced request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log(`[${timestamp}] Request Headers: ${JSON.stringify(req.headers)}`);
  
  // For debugging, log request body except for large payloads
  if (req.method !== 'GET' && req.body) {
    const bodySize = JSON.stringify(req.body).length;
    if (bodySize < 1000) {
      console.log(`[${timestamp}] Request Body: ${JSON.stringify(req.body)}`);
    } else {
      console.log(`[${timestamp}] Request Body: (Large payload ${bodySize} bytes)`);
    }
  }
  
  // Add response logging
  const originalSend = res.send;
  res.send = function(body) {
    const responseTimestamp = new Date().toISOString();
    console.log(`[${responseTimestamp}] Response Status: ${res.statusCode}`);
    
    // Log response body unless it's too large
    const responseSize = body ? (typeof body === 'string' ? body.length : JSON.stringify(body).length) : 0;
    if (responseSize < 1000) {
      console.log(`[${responseTimestamp}] Response Body: ${typeof body === 'string' ? body : JSON.stringify(body)}`);
    } else {
      console.log(`[${responseTimestamp}] Response Body: (Large payload ${responseSize} bytes)`);
    }
    
    originalSend.call(this, body);
    return this;
  };
  
  next();
});

// Routes
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('[Health Check] Received health check request');
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.stack}`);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong on the server'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`[SERVER] ${new Date().toISOString()} - Server started and running on port ${PORT}`);
  console.log(`[SERVER] ${new Date().toISOString()} - API endpoints:`);
  console.log(`[SERVER] - Health check: http://localhost:${PORT}/health`);
  console.log(`[SERVER] - Chat API: http://localhost:${PORT}/api/chat`);
});