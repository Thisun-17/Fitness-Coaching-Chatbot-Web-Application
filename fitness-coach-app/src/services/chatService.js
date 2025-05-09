import axios from 'axios';

// Base URL for the Node.js backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Send a message to the fitness chatbot API
 * @param {string} message - User's message text
 * @returns {Promise<Object>} - Response from the server
 */
export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      message,
      timestamp: new Date().toISOString()
    });
    
    return response.data;
  } catch (error) {
    console.error('Error in chat service:', error);
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
    const response = await axios.post(`${API_URL}/workouts/recommend`, preferences);
    return response.data;
  } catch (error) {
    console.error('Error fetching workout recommendations:', error);
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
    const response = await axios.post(`${API_URL}/nutrition/advice`, goals);
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrition advice:', error);
    throw error;
  }
};