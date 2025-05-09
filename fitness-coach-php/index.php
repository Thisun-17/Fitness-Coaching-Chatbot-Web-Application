<?php
/**
 * Entry point for the Fitness Coach PHP backend
 */

// Set response headers
header('Content-Type: application/json');

// Include configuration
require_once 'config.php';

// Check if the API is available
$status = [
    'status' => 'ok',
    'name' => 'Fitness Coach API',
    'version' => '1.0.0',
    'endpoints' => [
        '/api/chat.php' => 'Process chat messages',
        '/api/exercises.php' => 'Get exercise information',
        '/api/nutrition.php' => 'Get nutrition information'
    ],
    'timestamp' => date('Y-m-d H:i:s')
];

// Return API status
echo json_encode($status);'