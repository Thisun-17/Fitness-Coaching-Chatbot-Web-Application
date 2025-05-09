<?php
/**
 * Configuration file for the Fitness Coach PHP backend
 */

// Error reporting (set to 0 in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define base paths
define('BASE_PATH', dirname(__FILE__));
define('API_PATH', BASE_PATH . '/api');
define('MODELS_PATH', BASE_PATH . '/models');

// Database configuration (if needed later)
define('DB_HOST', 'localhost');
define('DB_NAME', 'fitness_coach');
define('DB_USER', 'root');
define('DB_PASS', '');

// API Keys and external services (if needed)
define('USE_EXTERNAL_API', false);
define('API_KEY', ''); // Add your API key here if using external services