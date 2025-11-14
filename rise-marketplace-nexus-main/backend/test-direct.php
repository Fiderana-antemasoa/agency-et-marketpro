<?php

// Test direct de l'API sans serveur web
require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';

// Simuler une requête GET vers /api/test
$request = Illuminate\Http\Request::create('/api/test', 'GET');
$request->headers->set('Accept', 'application/json');

try {
    $response = $app->handle($request);
    
    echo "Status: " . $response->getStatusCode() . "\n";
    echo "Content: " . $response->getContent() . "\n";
    
    if ($response->getStatusCode() === 200) {
        echo "✅ API fonctionne correctement!\n";
    } else {
        echo "❌ Erreur API\n";
    }
} catch (Exception $e) {
    echo "❌ Exception: " . $e->getMessage() . "\n";
}

// Test de la route register
echo "\n--- Test route register ---\n";
$registerRequest = Illuminate\Http\Request::create('/api/auth/register', 'POST', [
    'first_name' => 'Test',
    'last_name' => 'User',
    'email' => 'test@example.com',
    'password' => 'password123',
    'password_confirmation' => 'password123'
]);
$registerRequest->headers->set('Accept', 'application/json');
$registerRequest->headers->set('Content-Type', 'application/json');

try {
    $registerResponse = $app->handle($registerRequest);
    echo "Register Status: " . $registerResponse->getStatusCode() . "\n";
    echo "Register Content: " . $registerResponse->getContent() . "\n";
} catch (Exception $e) {
    echo "❌ Register Exception: " . $e->getMessage() . "\n";
}
