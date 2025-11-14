@echo off
echo Setting up Marketplace Database...

echo.
echo 1. Running migrations...
php artisan migrate --force

echo.
echo 2. Seeding database with test data...
php artisan db:seed --class=MarketplaceUsersSeeder

echo.
echo 3. Database setup complete!
echo.
echo Test accounts created:
echo - Admin: admin@marketpro.com (password: admin123)
echo - Client: jean.dupont@example.com (password: password123)
echo - Vendor: contact@techstore.com (password: vendor123)
echo.
pause
