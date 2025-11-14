<?php

// Test simple sans middleware
require_once 'vendor/autoload.php';

use Illuminate\Http\Request;

$app = require_once 'bootstrap/app.php';

echo "=== Test Simple API ===\n";

// Test route simple
$request = Request::create('/api/test', 'GET');
$request->headers->set('Accept', 'application/json');

try {
    $response = $app->handle($request);
    echo "Status: " . $response->getStatusCode() . "\n";
    echo "Content: " . $response->getContent() . "\n";
} catch (Exception $e) {
    echo "Exception: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
