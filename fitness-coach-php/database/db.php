<?php
/**
 * Database Connection File
 * 
 * Establishes connection to the MySQL database for the Fitness Coach application
 */

// Include configuration
require_once dirname(__DIR__) . '/config.php';

/**
 * Get database connection
 * @return PDO Database connection object
 */
function getDbConnection() {
    try {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ];
        
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Log the error but don't expose details to client
        error_log('Database Connection Error: ' . $e->getMessage());
        return null;
    }
}

/**
 * Test database connection
 * @return bool True if connection is successful, false otherwise
 */
function testDbConnection() {
    try {
        $conn = getDbConnection();
        if ($conn) {
            return true;
        }
        return false;
    } catch (Exception $e) {
        return false;
    }
}