<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configure password reset URL for frontend
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return 'http://localhost:5174/reset-password/' . $token . '?email=' . urlencode($notifiable->getEmailForPasswordReset());
        });
    }
}
