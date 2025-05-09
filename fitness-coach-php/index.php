<?php
/**
 * Fitness Coach PHP Backend Entry Point
 * 
 * This file serves as the main entry point for the PHP backend
 */

// Set headers for cross-origin requests and JSON response
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

// Include configuration
require_once './config.php';

// Display basic info about the API
$apiInfo = [
    'name' => 'Fitness Coach API',
    'version' => '1.0.0',
    'description' => 'API for the Fitness Coaching Chatbot Web Application',
    'endpoints' => [
        'health' => '/api/health.php - Check API health status',
        'chat' => '/api/chat.php - Chat with the fitness coach',
        'exercises' => '/api/exercises.php - Get exercise information',
        'nutrition' => '/api/nutrition.php - Get nutrition information'
    ],
    'status' => 'online',
    'timestamp' => date('Y-m-d H:i:s')
];

// Return API info
http_response_code(200);
echo json_encode($apiInfo);
exit();