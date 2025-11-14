<?php

// Script de test pour l'API Marketplace
echo "=== Test API Marketplace ===\n\n";

// Test 1: Connexion à la base de données
echo "1. Test de connexion à la base de données...\n";
try {
    require_once 'vendor/autoload.php';
    
    $app = require_once 'bootstrap/app.php';
    $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
    
    $pdo = DB::connection()->getPdo();
    echo "✅ Connexion à la base de données réussie\n";
    echo "   Driver: " . $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) . "\n";
} catch (Exception $e) {
    echo "❌ Erreur de connexion: " . $e->getMessage() . "\n";
}

// Test 2: Vérification des tables
echo "\n2. Vérification des tables...\n";
try {
    $tables = DB::select("SHOW TABLES");
    echo "✅ Tables trouvées: " . count($tables) . "\n";
    
    // Vérifier la table users
    $userCount = DB::table('users')->count();
    echo "   - Table users: {$userCount} utilisateurs\n";
    
    // Vérifier les colonnes de la table users
    $columns = DB::select("DESCRIBE users");
    $columnNames = array_column($columns, 'Field');
    
    $requiredColumns = ['first_name', 'last_name', 'phone', 'user_type', 'is_active'];
    $missingColumns = array_diff($requiredColumns, $columnNames);
    
    if (empty($missingColumns)) {
        echo "✅ Toutes les colonnes marketplace sont présentes\n";
    } else {
        echo "❌ Colonnes manquantes: " . implode(', ', $missingColumns) . "\n";
    }
    
} catch (Exception $e) {
    echo "❌ Erreur lors de la vérification des tables: " . $e->getMessage() . "\n";
}

// Test 3: Test des routes API
echo "\n3. Test des routes API...\n";
try {
    // Simuler une requête GET à /api/test
    $response = file_get_contents('http://localhost:8000/api/test');
    if ($response) {
        echo "✅ Route /api/test accessible\n";
        $data = json_decode($response, true);
        if ($data && $data['success']) {
            echo "   Message: " . $data['message'] . "\n";
        }
    } else {
        echo "❌ Route /api/test non accessible\n";
    }
} catch (Exception $e) {
    echo "❌ Erreur lors du test des routes: " . $e->getMessage() . "\n";
    echo "   Assurez-vous que le serveur Laravel est démarré (php artisan serve)\n";
}

echo "\n=== Fin des tests ===\n";
echo "Pour démarrer le serveur: php artisan serve\n";
echo "URL API: http://localhost:8000/api\n";
echo "URL Frontend: http://localhost:5173\n";
