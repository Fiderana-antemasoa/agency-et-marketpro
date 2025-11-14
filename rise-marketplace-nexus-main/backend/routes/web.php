<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PasswordResetLinkController;
use App\Http\Controllers\Api\NewPasswordController;

Route::get('/', function () {
    return view('welcome');
});

// API Routes temporaires pour debug (sans CSRF)
Route::prefix('api')->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class])->group(function () {
    // Test route
    Route::get('/test', function () {
        return response()->json([
            'success' => true,
            'message' => 'Marketplace API is working!',
            'timestamp' => now()
        ]);
    });

    // Public authentication routes
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    // Password reset routes
    Route::post('/api/forgot-password', [PasswordResetLinkController::class, 'store']);
    Route::post('/api/reset-password', [NewPasswordController::class, 'store']);

    // Protected routes (require authentication)
    Route::middleware('auth:web')->prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
    });

    // Get authenticated user (fallback route)
    Route::middleware('auth:web')->get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $request->user()
            ]
        ]);
    });
});
