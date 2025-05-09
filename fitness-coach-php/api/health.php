<?php
/**
 * Health Check API Endpoint
 * 
 * Provides connection verification for the Node.js backend
 */

// Set headers for cross-origin requests and JSON response
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

// Include configuration
require_once '../config.php';
require_once '../database/db.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check connection status
$status = [
    'status' => 'ok',
    'timestamp' => date('Y-m-d H:i:s'),
    'version' => '1.0.0',
    'environment' => 'development',
    'services' => [
        'php' => [
            'status' => 'ok',
            'version' => phpversion()
        ],
        'database' => [
            'status' => testDbConnection() ? 'ok' : 'error',
            'connected' => testDbConnection()
        ]
    ]
];

// Return health status
http_response_code(200);
echo json_encode($status);
exit();