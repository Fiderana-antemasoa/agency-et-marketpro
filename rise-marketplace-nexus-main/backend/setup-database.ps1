Write-Host "Setting up Marketplace Database..." -ForegroundColor Green

Write-Host ""
Write-Host "1. Running migrations..." -ForegroundColor Yellow
php artisan migrate --force

Write-Host ""
Write-Host "2. Seeding database with test data..." -ForegroundColor Yellow
php artisan db:seed --class=MarketplaceUsersSeeder

Write-Host ""
Write-Host "3. Database setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Test accounts created:" -ForegroundColor Cyan
Write-Host "- Admin: admin@marketpro.com (password: admin123)" -ForegroundColor White
Write-Host "- Client: jean.dupont@example.com (password: password123)" -ForegroundColor White
Write-Host "- Vendor: contact@techstore.com (password: vendor123)" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to continue"
