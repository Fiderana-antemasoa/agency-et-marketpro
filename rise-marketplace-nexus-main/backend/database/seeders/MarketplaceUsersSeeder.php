<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class MarketplaceUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin MarketPro',
            'first_name' => 'Admin',
            'last_name' => 'MarketPro',
            'email' => 'admin@marketpro.com',
            'phone' => '+33 1 23 45 67 89',
            'password' => Hash::make('admin123'),
            'user_type' => 'admin',
            'is_active' => true,
            'newsletter_subscription' => false,
            'address' => '123 Rue de la Paix',
            'city' => 'Paris',
            'postal_code' => '75001',
            'country' => 'France',
            'email_verified_at' => now(),
        ]);

        // Create test client users
        User::create([
            'name' => 'Jean Dupont',
            'first_name' => 'Jean',
            'last_name' => 'Dupont',
            'email' => 'jean.dupont@example.com',
            'phone' => '+33 6 12 34 56 78',
            'password' => Hash::make('password123'),
            'user_type' => 'client',
            'is_active' => true,
            'newsletter_subscription' => true,
            'address' => '456 Avenue des Champs',
            'city' => 'Lyon',
            'postal_code' => '69000',
            'country' => 'France',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Marie Martin',
            'first_name' => 'Marie',
            'last_name' => 'Martin',
            'email' => 'marie.martin@example.com',
            'phone' => '+33 6 98 76 54 32',
            'password' => Hash::make('password123'),
            'user_type' => 'client',
            'is_active' => true,
            'newsletter_subscription' => false,
            'address' => '789 Boulevard Saint-Germain',
            'city' => 'Marseille',
            'postal_code' => '13000',
            'country' => 'France',
            'email_verified_at' => now(),
        ]);

        // Create test vendor users
        User::create([
            'name' => 'TechStore SARL',
            'first_name' => 'TechStore',
            'last_name' => 'SARL',
            'email' => 'contact@techstore.com',
            'phone' => '+33 1 45 67 89 01',
            'password' => Hash::make('vendor123'),
            'user_type' => 'vendor',
            'is_active' => true,
            'newsletter_subscription' => true,
            'address' => '12 Rue du Commerce',
            'city' => 'Toulouse',
            'postal_code' => '31000',
            'country' => 'France',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Fashion Boutique',
            'first_name' => 'Fashion',
            'last_name' => 'Boutique',
            'email' => 'info@fashionboutique.com',
            'phone' => '+33 4 56 78 90 12',
            'password' => Hash::make('vendor123'),
            'user_type' => 'vendor',
            'is_active' => true,
            'newsletter_subscription' => false,
            'address' => '34 Place de la Mode',
            'city' => 'Nice',
            'postal_code' => '06000',
            'country' => 'France',
            'email_verified_at' => now(),
        ]);

        // Create some additional test clients
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => "Client Test {$i}",
                'first_name' => "Client{$i}",
                'last_name' => "Test",
                'email' => "client{$i}@test.com",
                'phone' => "+33 6 " . str_pad($i, 2, '0', STR_PAD_LEFT) . " " . rand(10, 99) . " " . rand(10, 99) . " " . rand(10, 99),
                'password' => Hash::make('password123'),
                'user_type' => 'client',
                'is_active' => true,
                'newsletter_subscription' => rand(0, 1),
                'address' => rand(1, 999) . " Rue Test {$i}",
                'city' => ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier'][rand(0, 7)],
                'postal_code' => rand(10000, 99999),
                'country' => 'France',
                'email_verified_at' => now(),
            ]);
        }
    }
}
