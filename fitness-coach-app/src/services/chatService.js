import axios from 'axios';

// Base URL for the Node.js backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// For debugging - log the API URL being used
console.log('[ChatService] Using API URL:', API_URL);

// Configure axios with interceptors for logging
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[ChatService] Sending ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    console.log(`[ChatService] Request headers:`, config.headers);
    if (config.data) {
      console.log(`[ChatService] Request data:`, config.data);
    }
    return config;
  },
  (error) => {
    console.error('[ChatService] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[ChatService] Response status: ${response.status}`);
    console.log(`[ChatService] Response data:`, response.data);
    return response;
  },
  (error) => {
    console.error('[ChatService] Response error:', error);
    if (error.response) {
      console.error(`[ChatService] Error status: ${error.response.status}`);
      console.error(`[ChatService] Error data:`, error.response.data);
    }
    return Promise.reject(error);
  }
);

/**
 * Send a message to the fitness chatbot API
 * @param {string} message - User's message text
 * @returns {Promise<Object>} - Response from the server
 */
export const sendMessage = async (message) => {
  try {
    console.log('[ChatService] Sending message:', message);
    const response = await apiClient.post('/chat', {
      message,
      timestamp: new Date().toISOString()
    });
    
    return response.data;
  } catch (error) {
    console.error('[ChatService] Error sending message:', error);
    throw error;
  }
};

/**
 * Fetch workout recommendations based on user preferences
 * @param {Object} preferences - User's workout preferences
 * @returns {Promise<Object>} - Workout recommendations
 */
export const getWorkoutRecommendations = async (preferences) => {
  try {
    console.log('[ChatService] Fetching workout recommendations with preferences:', preferences);
    const response = await apiClient.post('/workouts/recommend', preferences);
    return response.data;
  } catch (error) {
    console.error('[ChatService] Error fetching workout recommendations:', error);
    throw error;
  }
};

/**
 * Fetch nutrition advice based on user's goals
 * @param {Object} goals - User's fitness goals
 * @returns {Promise<Object>} - Nutrition advice
 */
export const getNutritionAdvice = async (goals) => {
  try {
    console.log('[ChatService] Fetching nutrition advice with goals:', goals);
    const response = await apiClient.post('/nutrition/advice', goals);
    return response.data;
  } catch (error) {
    console.error('[ChatService] Error fetching nutrition advice:', error);
    throw error;
  }
};

/**
 * Verify connection to backend server
 * @returns {Promise<boolean>} - True if connection is successful
 */
export const verifyBackendConnection = async () => {
  try {
    console.log('[ChatService] Verifying backend connection...');
    const response = await axios.get(`${API_URL.replace('/api', '')}/health`);
    console.log('[ChatService] Backend connection verified:', response.data);
    return true;
  } catch (error) {
    console.error('[ChatService] Backend connection failed:', error);
    return false;
  }
};