<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->nullable()->after('name');
            $table->string('last_name')->nullable()->after('first_name');
            $table->string('phone')->nullable()->after('email');
            $table->enum('user_type', ['client', 'vendor', 'admin'])->default('client')->after('phone');
            $table->boolean('is_active')->default(true)->after('user_type');
            $table->boolean('newsletter_subscription')->default(false)->after('is_active');
            $table->timestamp('last_login_at')->nullable()->after('newsletter_subscription');
            $table->string('avatar')->nullable()->after('last_login_at');
            $table->text('address')->nullable()->after('avatar');
            $table->string('city')->nullable()->after('address');
            $table->string('postal_code')->nullable()->after('city');
            $table->string('country')->nullable()->after('postal_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'first_name',
                'last_name',
                'phone',
                'user_type',
                'is_active',
                'newsletter_subscription',
                'last_login_at',
                'avatar',
                'address',
                'city',
                'postal_code',
                'country'
            ]);
        });
    }
};
