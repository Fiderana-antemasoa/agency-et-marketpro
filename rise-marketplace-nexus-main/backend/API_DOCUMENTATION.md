# Marketplace API Documentation

## Setup
1. Run: `php artisan migrate`
2. Run: `php artisan db:seed --class=MarketplaceUsersSeeder`

## Authentication Endpoints

### POST /api/auth/register
Register new user
```json
{
  "first_name": "Jean",
  "last_name": "Dupont", 
  "email": "jean@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "phone": "+33612345678",
  "user_type": "client"
}
```

### POST /api/auth/login
Login user
```json
{
  "email": "jean@example.com",
  "password": "password123"
}
```

### POST /api/auth/logout
Logout (requires auth)

### GET /api/auth/profile
Get user profile (requires auth)

### PUT /api/auth/profile
Update profile (requires auth)

## Test Accounts
- Admin: admin@marketpro.com / admin123
- Client: jean.dupont@example.com / password123
- Vendor: contact@techstore.com / vendor123
